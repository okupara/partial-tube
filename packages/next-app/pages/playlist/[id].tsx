import React from "react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { initFirebase } from "../../utils/initFirebase"
import firebase from "firebase"
import { addSession } from "../../middlewares/addSession"
import {
  Playlist as LayoutPlaylist,
  PlaylistProps,
} from "@partial-tube/core/lib/layouts/Playlist"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"

type Props = {
  playlist: PlaylistProps
  fbAuth: HooksReturnType
}

export const Playlist = (props: Props) => {
  console.log("props!!!", props)
  const router = useRouter()
  console.log(router)
  const { playlist, fbAuth } = props

  return (
    <NeedsLogin fbAuth={fbAuth}>
      <LayoutPlaylist
        id={playlist.id}
        videos={playlist.videos}
        title={playlist.title}
        lastUpdate={new Date()}
        numOfVids={playlist.numOfVids}
        comment={playlist.comment}
        totalPlaySec={playlist.totalPlaySec}
        onClickPlay={(id) => router.push("/player/[id]", `/player/${id}`)}
      />
    </NeedsLogin>
  )
}

Playlist.getInitialProps = async (ctx: NextPageContext) => {
  if (typeof window === "undefined") {
    const { req, res } = ctx
    addSession(req, res)
    const actualReq = (req as unknown) as RequestWithSession
    const authUser = actualReq.session?.user // why does user become "any"??
    if (!authUser) {
      return {}
    }
    initFirebase()
    const db = firebase.firestore()
    const id = ctx.query.id
    if (typeof id !== "string") {
      throw new Error("An unexpected value.")
    }
    console.log("PROPS", ctx.query.id)
    const ref = db.collection("playlists").doc(id)
    const doc = await ref.get()
    if (doc.exists) {
      const subDocSnapshot = await ref.collection("partials").get()
      const subs = subDocSnapshot.docs.map((elem) => {
        const data = elem.data()
        const created = new Date()
        created.setTime(data.created.seconds)
        return { ...data, id: elem.id, created }
      })
      console.log("SUBS", subs)
      return {
        playlist: { ...doc.data(), id: doc.id, videos: subs },
      }
    }
  }
  return {}
}

export default withAuth(Playlist)
