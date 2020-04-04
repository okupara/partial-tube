import * as admin from "firebase-admin"
import getConfig from "next/config"

export const verifyIdToken = (token: string) => {
  const { serverRuntimeConfig } = getConfig()
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serverRuntimeConfig.projectId,
        clientEmail: serverRuntimeConfig.clientEmail,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: serverRuntimeConfig.privateKey.replace(/\\n/g, "\n"),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
  }

  return admin.auth().verifyIdToken(token)
}
