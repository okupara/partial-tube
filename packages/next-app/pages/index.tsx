import getConfig from "next/config"
import { withAuth } from "../compositions/withAuth"
import { NeedsLogin } from "../containers/NeedsLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"

type Props = {
  fbAuth: HooksReturnType
  a: number
}

const Index = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <div style={{ marginTop: "220px" }}>are?????{props.a}</div>
    </NeedsLogin>
  )
}

Index.getInitialProps = async () => {
  console.log("SSR in Index.tsx", typeof window === "undefined")
  const { serverRuntimeConfig } = getConfig()

  // totally freaked me out that importing firebase-admin occurs unreasonable errors...
  //
  // const admin = require("firebase-admin")
  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: serverRuntimeConfig.projectId,
  //     clientEmail: serverRuntimeConfig.clientEmail,
  //     // https://stackoverflow.com/a/41044630/1332513
  //     privateKey: serverRuntimeConfig.privateKey.replace(/\\n/g, "\n"),
  //   }),
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  // })
  // const db = admin.firestore()

  const firebase: FirebaseType = require("firebase")
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: serverRuntimeConfig.apiKey,
      authDomain: serverRuntimeConfig.authDomain,
      databaseUrl: serverRuntimeConfig.databaseUrl,
      projectId: serverRuntimeConfig.projectId,
    })
  }

  // const db: FireStoreType = firebase.firestore()
  // const snapshots = await db.collection("playlists").get()
  // const records = snapshots.docs.map((elem) => elem.data())
  // console.log("--------------OK", records)

  // await db.collection("playlists").add({
  //   uid: "hogehogeaaa",
  //   title: "test3333333",
  // })

  return { a: 1 }
}

export default withAuth(Index)
