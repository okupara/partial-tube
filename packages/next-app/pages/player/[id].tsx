import { NextPageContext } from "next"
import { initFirebase } from "../../utils/initFirebase"
import firebase from "firebase"
import {
  ListProps,
  Player as PlayerLayout,
} from "@partial-tube/core/lib/layouts/PartialVideoPlayer"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { withAuth } from "../../compositions/withAuth"

type Props = {
  videos: ListProps
  fbAuth: HooksReturnType
}

const Player = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <PlayerLayout partialVideoList={props.videos} />
    </NeedsLogin>
  )
}

Player.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id
  console.log("PLAYER @ID!!!!!")
  if (typeof id !== "string") {
    throw new Error("Unexpectedly, id is not a string")
  }
  initFirebase()
  const db = firebase.firestore()
  const ref = db.collection("playlists").doc(id).collection("partials")
  const snapshots = await ref.get()
  const result = snapshots.docs.map((el) => {
    const data = el.data()
    return { ...data, partialVideoId: el.id }
  })
  console.log(result)

  return {
    videos: result,
  }
}

export default withAuth(Player)
