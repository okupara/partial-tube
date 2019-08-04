import firebase from 'firebase'
import { useAuthDispatcher } from 'context/Auth'
import { createUser } from '@partial-tube/domain/lib/User'

//TODO: should move to useLogin.ts??
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

if (process.env.FIREBASE_CONFIG) {
  firebase.initializeApp(process.env.FIREBASE_CONFIG)
} else {
  console.error("couldn't find the firebase config")
}

export const useLogin = () => {
  const dispatcher = useAuthDispatcher()
  // change to task sequence??
  return () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // we
        const user = firebase.auth().currentUser
        if (user) {
          user.getIdToken(true).then(idToken => {
            const userRecord = createUser(user.displayName, user.photoURL)
            dispatcher(userRecord, idToken)
          })
        }
      })
  }
}
