import useFirebaseAuth from 'hooks/useFirebaseAuth'
import useVerifyToken from 'hooks/useVerifyToken'
import * as User from '@partial-tube/domain/lib/User'
import * as AuthModel from '@partial-tube/domain/lib/Auth/index'

type Props = {
  waiting: () => JSX.Element
  failed: (error?: Error) => JSX.Element
  success: (user: User.Record) => JSX.Element
}

const Auth = (props: Props) => {
  const resFirebase = useFirebaseAuth()
  const resToken = useVerifyToken()

  const state = AuthModel.makeCurrentState({
    fbState: resFirebase.state,
    tokenState: resToken.state
  })
  return AuthModel.match<JSX.Element>(state, {
    waiting: () => props.waiting(),
    failed: error => props.failed(error),
    success: user => props.success(user)
  })
}
export default Auth

// import { useState, useEffect } from 'react'
// import gql from 'graphql-tag'
// import { useApolloClient } from '@apollo/react-hooks'
// import { ApolloClient } from "apollo-client"
// import * as AuthModel from '@partial-tube/domain/lib/Auth'
// import * as User from '@partial-tube/domain/lib/User'
// import * as Ls from 'utils/LocalStorage'
// import firebase from 'firebase'
// import { ErrorCommand, isFirst } from 'apollo/ErrorHelper'

// const provider = new firebase.auth.GoogleAuthProvider()
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

// if (process.env.FIREBASE_CONFIG) {
//   firebase.initializeApp(process.env.FIREBASE_CONFIG)
// } else {
//   console.error("couldn't find the firebase config")
// }

// const query = gql`
//   {
//     verify {
//       userId
//       name
//       avatarUrl
//     }
//   }
// `
// type ResponseData = {
//   verify: User.Record
// }

// type NotSiginInProps = {
//   error: AuthModel.ErrorTypes
//   signIn: () => void
// }

// type Props = {
//   signedIn: (signOut: () => void, user: User.Record) => JSX.Element
//   notSignedIn: (props: NotSiginInProps) => JSX.Element
//   default: () => JSX.Element
// }

// const identifyError = (error: ErrorCommand): AuthModel.State => {
//   if (isFirst(error, AuthModel.InvalidTokenError.tag)) {
//     Ls.clearToken()
//     return AuthModel.beInvalidTokenError()
//   }
//   return AuthModel.beNetworkError()
// }

// type ProcessAuthParam = {
//   setState: React.Dispatch<React.SetStateAction<AuthModel.State>>
//   state: AuthModel.State
//   apolloClient: ApolloClient<object>
// }

// const processAuth = async ({
//   setState, state, apolloClient
// }: ProcessAuthParam) => {
//   if ()

// }

// const Auth = (props: Props) => {
//   const [state, setState] = useState<AuthModel.State>(AuthModel.init())
//   const client = useApolloClient()

//   useEffect(() => {
//     const prcessAuth = async () => {
//       if (AuthModel.isStateInit(state)) {
//         setState(AuthModel.takeToken(Ls.getToken()))
//       }
//       if (AuthModel.isStateGotToken(state)) {
//         client
//           .query<ResponseData>({ query })
//           .then(result =>
//             setState(AuthModel.takeQueryResult(state, result.data.verify))
//           )
//           .catch(error => setState(identifyError(error)))
//       }
//     }
//     prcessAuth()
//   }, [state])

//   if (AuthModel.isErrorState(state)) {
//     const signIn = () => userLogin()

//     return props.notSignedIn({ error: state.left, signIn })
//   }
//   if (AuthModel.isStateDone(state)) {
//     const signOut = () => setState(AuthModel.beRejectedError())
//     return props.signedIn(signOut, state.right.record)
//   }
//   return props.default()
// }

// const readLoginProcess = () => new Promise((res) => {
//   firebase.auth().getRedirectResult().then(res => {
//     if(res.credential) {
//       const user = firebase.auth().currentUser
//       if (!user) {
//         throw new Error("Couldn't get a user info")
//       }
//       return user.getIdToken(true)
//     }
//     throw new Error("It's not in the firebase auth process")
//   })
//   .then(idToken => res({

//   }))
//   .catch(error => res())

// })

// const userLogin = (): Promise<AuthModel.takeLoggedInCommand> =>
//   new Promise((res, rej) => {
//     firebase.auth().signInWithRedirect(provider)
//     //     .then(_ => {
//     //       const user = firebase.auth().currentUser
//     //       if (!user) {
//     //         return rej()
//     //       }
//     //       user
//     //         .getIdToken(true)
//     //         .then(idToken =>
//     //           res({
//     //             token: idToken,
//     //             user: {
//     //               userId: user.uid,
//     //               name: user.displayName,
//     //               avatarUrl: user.photoURL
//     //             }
//     //           })
//     //         )
//     //         .catch(rej)
//     //     })
//     //     .catch(rej)
//   })

// export default Auth
