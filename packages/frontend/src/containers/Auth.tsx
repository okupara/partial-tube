import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import * as AuthModel from '@partial-tube/domain/lib/Auth'
import * as User from '@partial-tube/domain/lib/User'
import * as Ls from 'utils/LocalStorage'
import firebase from 'firebase'
import { ErrorCommand, isFirst } from 'apollo/ErrorHelper'

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

if (process.env.FIREBASE_CONFIG) {
  firebase.initializeApp(process.env.FIREBASE_CONFIG)
} else {
  console.error("couldn't find the firebase config")
}

const query = gql`
  {
    verify {
      userId
      name
      avatarUrl
    }
  }
`
type ResponseData = {
  verify: User.Record
}

type NotSiginInProps = {
  error: AuthModel.ErrorTypes
  signIn: () => void
}

type Props = {
  signedIn: (signOut: () => void, user: User.Record) => JSX.Element
  notSignedIn: (props: NotSiginInProps) => JSX.Element
  default: () => JSX.Element
}

const identifyError = (error: ErrorCommand): AuthModel.State => {
  if (isFirst(error, AuthModel.InvalidTokenError.tag)) {
    Ls.clearToken()
    return AuthModel.beInvalidTokenError()
  }
  return AuthModel.beNetworkError()
}

const Auth = (props: Props) => {
  const [state, setState] = useState(AuthModel.init())
  const client = useApolloClient()

  useEffect(() => {
    if (AuthModel.isStateInit(state)) {
      setState(AuthModel.takeToken(Ls.getToken()))
    }
    if (AuthModel.isStateGotToken(state)) {
      client
        .query<ResponseData>({ query })
        .then(result =>
          setState(AuthModel.takeQueryResult(state, result.data.verify))
        )
        .catch(error => setState(identifyError(error)))
    }
  }, [state])

  if (AuthModel.isErrorState(state)) {
    const signIn = () =>
      userLogin()
        .then(res => setState(AuthModel.takeLoggedIn(Ls.setToken, res)))
        .catch(() => setState(AuthModel.beRejectedError()))

    return props.notSignedIn({ error: state.left, signIn })
  }
  if (AuthModel.isStateDone(state)) {
    const signOut = () => setState(AuthModel.beRejectedError())
    return props.signedIn(signOut, state.right.record)
  }
  return props.default()
}

const userLogin = (): Promise<AuthModel.takeLoggedInCommand> =>
  new Promise((res, rej) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(_ => {
        const user = firebase.auth().currentUser
        if (!user) {
          return rej()
        }
        user
          .getIdToken(true)
          .then(idToken =>
            res({
              token: idToken,
              user: {
                userId: user.uid,
                name: user.displayName,
                avatarUrl: user.photoURL
              }
            })
          )
          .catch(rej)
      })
      .catch(rej)
  })

export default Auth
