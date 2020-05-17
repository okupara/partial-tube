import { QueryResolvers, MutationResolvers, Playlist } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import getConfig from "next/config"
import { addSession } from "../middlewares/addSession"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"
import fetch from "isomorphic-unfetch"
import { ScalarDate } from "./scalars"
import * as helper from "./firestoreHelper"

const PLAYLISTS = "playlists"
const PLAYLISTS_VIDEOS = "playlists_videos"
const VIDEOS = "videos"

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
  async video(_, args, ctx: NextPageContext) {
    initFirebase()
    const db = firebase.firestore()
    const user = extractUserSession(ctx)

    const videoDoc = db.collection("videos").doc(args.id)
    const snapShotVideo = await videoDoc.get()
    if (!snapShotVideo.exists) {
      return null
    }

    const videoData = snapShotVideo.data()
    if (!videoData || videoData.uid !== user.id) {
      return null
    }

    const snapShotLinkRecords = await db
      .collection("playlists_videos")
      .where("video", "==", videoDoc)
      .get()

    const playlistDocs = snapShotLinkRecords.docs.map((el) => el.data().playlist)
    let playlists: ReadonlyArray<Playlist> = []
    for (const doc of playlistDocs) {
      const p = await doc.get()
      const data = p.data()
      playlists = [
        ...playlists,
        {
          id: p.id,
          permission: data.permission,
          totalSec: data.totalSec,
          numOfVideos: data.numOfVideos,
          created: data.created.toDate(),
          name: data.name,
          videos: [],
        },
      ]
    }
    console.log("PLAYLISTS", playlists)

    return {
      id: videoDoc.id,
      videoId: videoData.videoId,
      title: videoData.title,
      start: videoData.start,
      end: videoData.end,
      comment: videoData.comment,
      created: videoData.created.toDate(),
      playlists: playlists as any, // hmmmm.... type errors...
    }
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

    return snapshots.docs.map((item) => {
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
    return playlistsSnapshot.docs.map((item) => {
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

    const videoRefs = snapshots.docs.map((el) => el.data().video)
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
    const resPlaylist = await db.collection(PLAYLISTS).add({
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
  async video(_, args, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    const db = firebase.firestore()
    if (!args.video) {
      throw new Error("Coudn't find an appropriate parameter")
    }
    const video = args.video!

    if (video.id) {
      // update
      const videoRes = await helper.getVideoWithId(db, video.id)
      if (!videoRes?.data) {
        throw new Error("Couldn't get the Video data")
      }
      await videoRes.doc.update({
        comment: video.comment,
        start: video.start,
        end: video.end,
      })
      const playlistsSet = new Set(video.playlists)
      const playlistsRes = await helper.getPlaylistsByVideo(db, videoRes.doc)
      let alreadyLinkedPlaylistIds: ReadonlyArray<string> = []
      if (playlistsRes !== null) {
        // TODO: this process should be with a transaction.
        for (const playlist of playlistsRes) {
          const currentDuration = videoRes.data.end - videoRes.data.start
          const newDuration = args.video.end - args.video.start
          const currentTotalSec = playlist.data.totalSec
          const newTotalSec = currentTotalSec - currentDuration + newDuration
          if (playlistsSet.has(playlist.data.id)) {
            await playlist.doc.update({ totalSec: newTotalSec })
          } else {
            // delete
            await db.collection(PLAYLISTS_VIDEOS).doc(playlist.data.id).delete()
            await playlist.doc.update({
              totalSec: currentTotalSec - currentDuration,
            })
          }
          alreadyLinkedPlaylistIds = [...alreadyLinkedPlaylistIds, playlist.data.id]
        }
      }
      const alreadyLinkedPlaylistSet = new Set(alreadyLinkedPlaylistIds)
      if (video.playlists) {
        // adds playlists-video link document if the playlists argument includes new playlists
        for (const playlistId of video.playlists) {
          console.log(alreadyLinkedPlaylistIds, playlistId)
          if (alreadyLinkedPlaylistSet.has(playlistId)) continue
          const playlistDoc = db.collection(PLAYLISTS).doc(playlistId)
          await db.collection(PLAYLISTS_VIDEOS).add({
            video: db.collection(VIDEOS).doc(video.id),
            playlist: db.collection(PLAYLISTS).doc(playlistId),
            created: new Date(),
          })
          const playlistLink = await helper.getFirstLinkByPlaylist(db, playlistDoc)
          const restUpdate =
            playlistLink.size === 1 ? { firstVideoId: video.videoId } : {}
          await playlistDoc.update({
            totalSec: firebase.firestore.FieldValue.increment(
              video.end - video.start,
            ),
            numOfVideos: firebase.firestore.FieldValue.increment(1),
            ...restUpdate,
          })
        }
      }

      return { id: video.id }
    } else {
      // add new one
      const resAddVideo = await db.collection(VIDEOS).add({
        uid: user!.id, // hope TS detects user is not null after the nullable check above.
        title: video!.title,
        start: video!.start,
        videoId: video!.videoId,
        comment: video!.comment,
        end: video!.end,
        created: new Date(),
      })

      if (video.playlists) {
        // const playlists = await helper.getPlaylistsByPlaylistIds(db, video.playlists)
        for (const playlistId of video.playlists) {
          const playlistDoc = db.collection(PLAYLISTS).doc(playlistId)
          await db.collection(PLAYLISTS_VIDEOS).add({
            video: resAddVideo,
            playlist: playlistDoc,
            created: new Date(),
          })

          const playlistLink = await helper.getFirstLinkByPlaylist(db, playlistDoc)
          const restUpdate =
            playlistLink.size === 1 ? { firstVideoId: video.videoId } : {}
          await playlistDoc.update({
            totalSec: firebase.firestore.FieldValue.increment(
              video.end - video.start,
            ),
            numOfVideos: firebase.firestore.FieldValue.increment(1),
            ...restUpdate,
          })
        }
      }
      return { id: resAddVideo.id }
    }
  },
}

export default { Query, Mutation, Date: ScalarDate }
