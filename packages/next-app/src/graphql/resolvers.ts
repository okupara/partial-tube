import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import { addSession } from "../middlewares/addSession"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"
import fetch from "isomorphic-unfetch"

const extractUserSession = (ctx: NextPageContext) => {
  const { req, res } = ctx
  addSession(req, res)
  const actualReq = (req as unknown) as RequestWithSession
  const user = actualReq.session?.user
  if (!user) {
    throw new Error("Authentication is required.")
  }
  return user
}

const Query: Required<QueryResolvers> = {
  async viewer() {
    return { id: String(1), name: "John Smith", status: "cached" }
  },
  // TODO: Filter words, offsets
  async playlists(_, __, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    initFirebase()
    const db = firebase.firestore()
    const playlistsSnapshot = await db
      .collection("playlists")
      .where("uid", "==", user.id)
      .get()
    if (playlistsSnapshot.empty) {
      return []
    }
    return playlistsSnapshot.docs.map((item) => {
      const data = item.data()
      console.log(data)
      return {
        id: item.id,
        name: data.name,
        created: data.created.seconds,
        numOfVideos: data.numOfVideos,
        permission: data.permission,
        totalSec: data.totalSec,
        uid: data.uid,
        updated: data.updated.seconds,
      }
    })
  },
  // TODO: stop using "any"....
  async playlist(_: any, args: any, ctx: NextPageContext): Promise<any> {
    console.log("ARGS", args)
    const { req, res } = ctx
    addSession(req, res)
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
  async youtubeVideo(_, args) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${args.videoId}&part=snippet&key=AIzaSyBJQ9ISjT9u-Rgjss7TRqyhASRU6hAVYaI`,
    )
    const obj = await res.json()
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
  async addPlaylist(_, { playlist }, ctx: NextPageContext): Promise<any> {
    console.log("START ADD PLAYLIST", playlist)
    const { req, res } = ctx
    addSession(req, res)
    const actualReq = (req as unknown) as RequestWithSession
    const user = actualReq.session?.user
    if (!user) {
      throw new Error("Authentication is required.")
    }
    if (!playlist) {
      throw new Error("seems no parameters")
    }
    const db = firebase.firestore()
    const now = new Date()
    const resPlaylist = await db.collection("playlists").add({
      uid: user!.id, // hope TS detects user is not null after the nullable check above.
      name: playlist!.name,
      comment: playlist!.comment ?? "",
      permission: playlist!.permission,
      numOfVideos: 0,
      totalSec: 0,
      created: now,
      updated: now,
    })

    return {
      id: resPlaylist.id,
      numOfVideos: 0,
      name: playlist!.name,
      comment: playlist!.comment,
      permission: playlist!.permission,
      created: now.getTime(),
      totalSec: now.getTime(),
      videos: [],
    }
  },
  async addVideo(_, args, ctx: NextPageContext): Promise<any> {
    const { req, res } = ctx
    addSession(req, res)

    const actualReq = (req as unknown) as RequestWithSession

    const user = actualReq.session?.user
    if (!user) {
      throw new Error("Authentication is required.")
    }
    const video = args.video
    if (!video) {
      throw new Error("It needs to set a parameter for adding Video")
    }
    const db = firebase.firestore()
    // still needs "!"...
    // possible null or undefined might be a problem with generating types by graphql-let?
    const videoCollection = db.collection("videos")
    const resAddVideo = await videoCollection.add({
      uid: user!.id, // hope TS detects user is not null after the nullable check above.
      title: video!.title,
      start: video!.start,
      end: video!.end,
      created: new Date(),
    })
    const refs = video.playlists?.map((el) => ({
      playlist: db.collection("playlists").doc(el),
    }))
    if (refs && refs.length > 0) {
      for (const it of refs) {
        await videoCollection.doc(resAddVideo.id).collection("playlistrefs").add(it)
        await it.playlist
          .collection("videorefs")
          .add({ video: videoCollection.doc(resAddVideo.id) })
        await it.playlist.update(
          "totalSec",
          firebase.firestore.FieldValue.increment(video!.end - video!.start),
        )
        await it.playlist.update(
          "numOfVideos",
          firebase.firestore.FieldValue.increment(1),
        )
      }
    }
    return {
      id: resAddVideo.id,
    }
  },
}

export default { Query, Mutation }
