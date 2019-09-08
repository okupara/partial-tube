import { useEffect, useState, useCallback } from 'react'
import firebase from 'firebase'
import * as model from '@partial-tube/domain/lib/Auth/Firebase'
import { setToken } from 'utils/LocalStorage'

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

if (process.env.FIREBASE_CONFIG) {
  firebase.initializeApp(process.env.FIREBASE_CONFIG)
} else {
  console.error("Couldn't find the firebase config")
}

// why unknown is that it gets validated later.
const tryReadAuth = (): Promise<unknown> =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .getRedirectResult()
      .then(res => {
        console.log('REDIRECT', res.credential)
        if (res.credential) {
          const token = (res.credential as any).idToken
          const user = res.user
          if (!user) {
            return reject(
              new Error('Seems login succeeded but maybe something is wrong')
            )
          }
          setToken({ value: token })
          resolve({
            token,
            user: {
              name: user.displayName,
              userId: user.uid,
              avatarUrl: user.photoURL
            }
          })
        }
        reject(new Error("It's not in the firebase auth process"))
      })
      .catch(error => reject({ error }))
  })

const useFirebaseAuth = () => {
  const [state, setState] = useState<model.State>(model.createInProgress())
  const loginDispatcher = useCallback(() => {
    firebase.auth().signInWithRedirect(provider)
  }, [])
  useEffect(() => {
    if (model.isInProgress(state)) {
      tryReadAuth()
        .then(res => setState(model.validate(res)))
        .catch(_ => setState(model.createFailed()))
    }
  }, [state])
  return {
    state,
    loginDispatcher
  }
}

export default useFirebaseAuth
