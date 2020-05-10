import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import getConfig from "next/config"
import { addSession } from "../middlewares/addSession"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"
import fetch from "isomorphic-unfetch"
import { ScalarDate } from "./scalars"

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
  async videos(_, __, ctx: NextPageContext): Promise<any> {
    initFirebase()
    const db = firebase.firestore()
    const user = extractUserSession(ctx)

    const snapshots = await db
      .collection("videos")
      .where("uid", "==", user.id)
      .orderBy("created", "desc")
      .get()
    if (snapshots.empty) {
      return []
    }

    return snapshots.docs.map(item => {
      const data = item.data()
      return {
        id: item.id,
        start: data.start,
        end: data.end,
        videoId: data.videoId,
        title: data.title,
        comment: data.comment,
        created: data.created.toDate(),
      }
    })
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
    return playlistsSnapshot.docs.map(item => {
      const data = item.data()
      return {
        id: item.id,
        name: data.name,
        created: data.created.toDate(),
        numOfVideos: data.numOfVideos,
        permission: data.permission,
        totalSec: data.totalSec,
        firstVideoId: data.firstVideoId,
        uid: data.uid,
        updated: data.updated.toDate(),
      }
    })
  },
  // TODO: stop using "any"....
  async playlist(_: any, args: any, ctx: NextPageContext): Promise<any> {
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

    const snapshots = await db
      .collection("playlists_videos")
      .where("playlist", "==", ref)
      .orderBy("created", "asc")
      .get()

    const videoRefs = snapshots.docs.map(el => el.data().video)
    let videos: any[] = []
    for (const vid of videoRefs) {
      const video = await vid.get()
      const data = video.data()
      videos = [
        ...videos,
        {
          id: video.id,
          start: data.start,
          end: data.end,
          comment: data.comment,
          title: data.title,
          videoId: data.videoId,
          created: data.created.toDate(),
        },
      ]
    }

    return {
      id: doc.id,
      comment: data.comment,
      created: data.created.toDate(),
      numOfVideos: data.numOfVideos,
      name: data.name,
      totalSec: data.totalSec,
      uid: data.uid,
      videos,
    }
  },
  async youtubeVideo(_, args) {
    const { serverRuntimeConfig } = getConfig()
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${args.videoId}&part=snippet&key=${serverRuntimeConfig.youtubeApiKey}`,
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
    const now = firebase.firestore.Timestamp.fromDate(new Date())
    const resPlaylist = await db.collection("playlists").add({
      uid: user!.id, // hope TS detects user is not null after the nullable check above.
      name: playlist!.name,
      comment: playlist!.comment ?? "",
      permission: playlist!.permission,
      numOfVideos: 0,
      totalSec: 0,
      firstVideoId: "",
      created: now,
      updated: now,
    })

    return {
      id: resPlaylist.id,
      numOfVideos: 0,
      name: playlist!.name,
      comment: playlist!.comment,
      permission: playlist!.permission,
      created: now,
      totalSec: now,
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
      videoId: video!.videoId,
      comment: video!.comment,
      end: video!.end,
      created: new Date(),
    })

    const refs = video.playlists?.map(el => db.collection("playlists").doc(el))
    if (refs && refs.length > 0) {
      for (const it of refs) {
        const first = await db
          .collection("playlists_videos")
          .where("playlist", "==", it)
          .get()
        const updateFirstVideo = first.empty ? { firstVideoId: video!.videoId } : {}

        await db.collection("playlists_videos").add({
          video: videoCollection.doc(resAddVideo.id),
          playlist: it,
          created: new Date(),
          updated: new Date(),
        })

        await it.update({
          totalSec: firebase.firestore.FieldValue.increment(
            video!.end - video!.start,
          ),
          numOfVideos: firebase.firestore.FieldValue.increment(1),
          ...updateFirstVideo,
        })
      }
    }
    return {
      id: resAddVideo.id,
    }
  },
}

export default { Query, Mutation, Date: ScalarDate }
