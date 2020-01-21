import { useEffect, useState, useCallback } from 'react'
import firebase, { User as FirebaseUser } from 'firebase'
import * as model from '@partial-tube/domain/lib/Auth/Firebase'

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

if (process.env.FIREBASE_CONFIG) {
  firebase.initializeApp(process.env.FIREBASE_CONFIG)
} else {
  console.error("Couldn't find the firebase config")
}

type Result = {
  token: string
  user: {
    userId: string
    name: string
    avatarUrl: string | null
  }
}

type TryReadAuthResult = {
  error?: Error
  data?: Result
}

const getAuthedUser = (): Promise<FirebaseUser | null> =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .onAuthStateChanged(user => resolve(user), error => resolve(null))
  })

const createResponse = (idToken: string, user: FirebaseUser): Result => ({
  token: idToken,
  user: {
    userId: user.uid,
    name: user.displayName || 'defaultName',
    avatarUrl: user.photoURL
  }
})

const tryReadAuthedUser = async () => {
  const user = await getAuthedUser()
  if (!user) {
    return { error: new Error('Login session is disconnected') }
  }
  const idToken = await user.getIdToken()
  return { data: createResponse(idToken, user) }
}

const tryReadUserFromRedirect = async (): Promise<TryReadAuthResult> => {
  const res = await firebase.auth().getRedirectResult()
  if (!res.credential)
    return { error: new Error("It's not in the redirect auth process") }
  const user = firebase.auth().currentUser
  if (!user)
    return {
      error: new Error('Seems login succeeded but maybe something is wrong')
    }
  const idToken = await user.getIdToken()
  return { data: createResponse(idToken, user) }
}

const tryReadAuth = async (): Promise<Result> => {
  const resultUser = await tryReadAuthedUser()
  if (resultUser.data) {
    return resultUser.data
  }
  const resultRedirect = await tryReadUserFromRedirect()
  if (resultRedirect.data) {
    return resultRedirect.data
  }
  throw resultRedirect.error
}

const useFirebaseAuth = () => {
  const [state, setState] = useState<model.State>(model.createInit())
  const loginDispatcher = useCallback(() => {
    firebase.auth().signInWithRedirect(provider)
  }, [])
  useEffect(() => {
    if (model.isInit(state)) {
      tryReadAuth()
        .then(res => setState(model.validate(res)))
        .catch(_ => setState(model.createFBAuthFailed()))
      setState(model.createInProgress())
    }
  }, [state]) // tag might be good enough...
  return {
    state,
    loginDispatcher
  }
}

export default useFirebaseAuth
