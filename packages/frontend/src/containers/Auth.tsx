import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import * as AuthModel from '@partial-tube/domain/lib/Auth'
import * as User from '@partial-tube/domain/lib/User'
import * as Token from '@partial-tube/domain/lib/Token'
import firebase from 'firebase'

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
      name
      avatarUrl
    }
  }
`
const getTokenLS = () => localStorage.getItem('token')
const setTokenLS = (token: Token.Record) =>
  localStorage.setItem('token', token.value)

type NotSiginInProps = {
  error: AuthModel.ErrorTypes
  signIn: () => void
}

type Props = {
  signedIn: (signOut: () => void, user: User.Record) => JSX.Element
  notSignedIn: (props: NotSiginInProps) => JSX.Element
  default: () => JSX.Element
}

const Auth = (props: Props) => {
  const [state, setState] = useState(AuthModel.init())
  const client = useApolloClient()

  useEffect(() => {
    console.log(state)
    if (AuthModel.isStateInit(state)) {
      setState(AuthModel.takeToken(getTokenLS()))
    }
    if (AuthModel.isStateGotToken(state)) {
      client
        .query({ query })
        .then(result => setState(AuthModel.takeQueryResult(state, result.data)))
        .catch(() => setState(AuthModel.beNetWorkError()))
    }
  }, [state])

  if (AuthModel.isErrorState(state)) {
    const signIn = () =>
      userLogin()
        .then(res => setState(AuthModel.takeLoggedIn(setTokenLS, res)))
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
