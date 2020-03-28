// @TODO: can we consider tree shaking?
// import firebase from "firebase"
// import { getNextConfig } from "../lib/loadConfig"
// let provider

// if (config.publicRuntimeConfig) {
// console.log("public", config.publicRuntimeConfig)
// // console.log("CONFIG2", config)
// //   const { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID } = publicRuntimeConfig.env
// const config = {
//   //   apiKey: API_KEY,
//   //   authDomain: AUTH_DOMAIN,
//   //   databaseURL: DATABASE_URL,
//   //   projectId: PROJECT_ID,
// }
// console.log("USE_FIREBASE_CONFIG", config)
// if (!firebase.apps.length) {
//   console.log("INITIALIZE FIREBASE")
//   firebase.initializeApp(config)
// }
// provider = new firebase.auth.GoogleAuthProvider()
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
// console.log("PROVIDER", provider)
// }

export const useFirebaseAuth = () => {
  //   console.log("INIT", firebase.auth())
  // console.log("TEST2", getConfig())
  // console.log("TEST useF", getNextConfig())
  // console.log(process.env)
  return {
    login() {
      // firebase.auth().signInWithRedirect(provider)
    },
  }
}
