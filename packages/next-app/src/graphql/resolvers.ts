import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import { addSession } from "../middlewares/addSession"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"
import fetch from "isomorphic-unfetch"

const Query: Required<QueryResolvers> = {
  async viewer() {
    return { id: String(1), name: "John Smith", status: "cached" }
  },
  // TODO: stop using "any"....
  async playlist(_: any, args: any, ctx: NextPageContext): Promise<any> {
    console.log("ARGS", args)
    const { req, res } = ctx
    addSession(req, res)
    const actualReq = (req as unknown) as RequestWithSession
    // I will use this later...
    console.log("TEST....mmn,,,,a", actualReq.session?.user, args)

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
      name: data.name,
      totalSec: data.totalSec,
      uid: data.uid,
      videos: subs ? subs : [],
    }
  },
  async youtubeVideo(_, args, context) {
    console.log("Youtuve Video Start ---", args, context)
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${args.videoId}&part=snippet&key=AIzaSyBJQ9ISjT9u-Rgjss7TRqyhASRU6hAVYaI`,
    )
    const obj = await res.json()
    console.log("OBJ", obj)
    if (Array.isArray(obj.items) === false || obj.items.length === 0) {
      return null
    }
    const result = obj.items[0].snippet
    const id = obj.items[0].id

    return {
      id,
      title: result.title,
      comment: result.description,
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
  async addVideo(_, args, ctx: NextPageContext): Promise<any> {
    const { req, res } = ctx
    addSession(req, res)

    const actualReq = (req as unknown) as RequestWithSession

    const user = actualReq.session?.user
    if (!user) {
      new Error("Authentication is required.")
    }
    const video = args.video
    if (!video) {
      new Error("It needs to set a parameter for adding Video")
    }
    const db = firebase.firestore()
    // still needs "!"...
    // possible null or undefined might be a problem with generating types by graphql-let?
    const resAddVideo = await db.collection("videos").add({
      uid: user!.id, // hope TS detects user is not null after the nullable check above.
      title: video!.title,
      start: video!.start,
      end: video!.end,
      created: new Date(),
    })
    return {
      id: resAddVideo.id,
    }
  },
}

export default { Query, Mutation }
