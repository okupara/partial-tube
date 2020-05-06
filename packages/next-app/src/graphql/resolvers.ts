import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import { addSession } from "../middlewares/addSession"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"

const Query: Required<QueryResolvers> = {
  async viewer() {
    return { id: String(1), name: "John Smith", status: "cached" }
  },
  // TODO: stop using "any"....
  async playlist(_: any, args: any, ctx: NextPageContext): Promise<any> {
    const { req, res } = ctx
    addSession(req, res)
    const actualReq = (req as unknown) as RequestWithSession
    // I will use this later...
    console.log("TEST....", actualReq.session?.user, args)

    if (!args.id) {
      throw new Error("Playlist-id is not defined")
    }

    initFirebase()
    const db = firebase.firestore()

    const ref = db.collection("playlists").doc(args.id)
    const doc = await ref.get()
    const data = doc.data()
    if (!doc.exists || !data) {
      throw new Error("This record does not exist")
    }

    const subDocSnapshot = await ref.collection("partials").get()
    const subs = subDocSnapshot.docs.map((elem) => {
      const data = elem.data()
      const created = new Date()
      created.setTime(data.created.seconds)
      return {
        id: elem.id,
        start: data.start,
        end: data.end,
        comment: data.comment,
        uid: data.uid,
        videoId: data.videoId,
        title: data.title,
        created: new Date().getTime(),
      }
    })

    return {
      id: doc.id,
      comment: data.comment,
      created: new Date().getTime(),
      numOfVideos: data.numOfVideos,
      title: data.title,
      totalSec: data.totalSec,
      uid: data.uid,
      videos: subs ? subs : [],
    }
  },
}

const Mutation: Required<MutationResolvers> = {
  async addPlaylist(_, args): Promise<any> {
    console.log(args)
    return {
      id: "jajaj",
      numOfVideos: 20,
      name: "hoge",
      comment: "",
      permission: "public",
      created: 111,
      totalSec: 111,
      videos: [],
    }
  },
  async addVideo(_, args): Promise<any> {
    console.log(args)
    return {}
  },
}

export default { Query, Mutation }
