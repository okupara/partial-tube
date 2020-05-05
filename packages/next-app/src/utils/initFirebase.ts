import firebase from "firebase"
import getConfig from "next/config"

export const initFirebase = () => {
  let config
  if (typeof window === "undefined") {
    config = getConfig().serverRuntimeConfig
  } else {
    config = getConfig().publicRuntimeConfig
  }
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseUrl: config.databaseUrl,
      projectId: config.projectId,
    })
  }
}
