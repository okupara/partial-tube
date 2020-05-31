import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls"
import { NextPageContext } from "next"
import getConfig from "next/config"
import { addSession } from "../middlewares/addSession"
import fetch from "isomorphic-unfetch"
import { ScalarDate } from "./scalars"
import * as helper from "./firestoreHelper"

const extractUserSession = (ctx: NextPageContext) => {
  const { req, res } = ctx
  addSession(req, res)
  const actualReq = (req as unknown) as RequestWithSession
  const user = actualReq.session?.user
  return user ?? null
}

const Query: Required<QueryResolvers> = {
  async viewer() {
    return { id: String(1), name: "John Smith", status: "cached" }
  },
  async video(_, args, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    const video = await dao.getVideo(args.id)
    return video.data
  },
  async videos(_, __, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    const videos = await dao.getVideos()
    return videos
  },
  // TODO: Filter words, offsets
  async playlists(_, __, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    const results = await dao.getPlaylists()
    console.log("RES", results)
    return results
  },
  async publicPlaylists(_, __, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    const dao = new helper.FirestoreDao(user)
    return await dao.getPublicPlaylists()
  },
  // TODO: stop using "any"....
  async playlist(_: any, args: any, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    const dao = new helper.FirestoreDao(user)
    const result = await dao.getPlaylist(args.id)
    if (!result) {
      return null
    }
    const { playlist, videos, firstVideoId } = result

    return {
      id: playlist.id,
      comment: playlist.comment,
      created: playlist.created,
      numOfVideos: playlist.numOfVideos,
      name: playlist.name,
      totalSec: playlist.totalSec,
      isOwner: playlist.isOwner,
      firstVideoId,
      videos,
    }
  },
  async youtubeVideo(_, args) {
    const { serverRuntimeConfig } = getConfig()
    if (!args.videoId) {
      throw new Error("Illegal parameter.")
    }
    console.log(
      `https://www.googleapis.com/youtube/v3/videos?id=${args.videoId}&part=snippet&key=${serverRuntimeConfig.youtubeApiKey}`,
    )
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${args.videoId}&part=snippet&key=${serverRuntimeConfig.youtubeApiKey}`,
    )
    const obj = await res.json()
    console.log(obj)
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
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    // TODO: reconsider to use "!"
    const resPlaylist = await dao.addPlaylist(playlist!)
    return {
      id: resPlaylist.id,
      numOfVideos: 0,
      name: playlist!.name,
      comment: playlist!.comment,
      permission: playlist!.permission,
      created: new Date(), // because its accuracy wouldn't be important.
      totalSec: 0, // also here
      videos: [],
    }
  },
  async deleteVideoFromPlaylist(_, args, ctx: NextPageContext): Promise<string> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    const video = await dao.getVideo(args.videoId)
    await dao.deleteVideoFromPlaylist({
      playlist: args.playlistId,
      video: video.doc,
      duration: video.data.end - video.data.start,
    })
    return "success"
  },
  async deletePlaylist(_, args, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    const dao = new helper.FirestoreDao(user)
    await dao.deletePlaylist(args.id)
    return args.id
  },
  async deleteVideo(_, args, ctx: NextPageContext): Promise<any> {
    // also should be in a transaction, though...
    const videoId = args.id
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission deined")
    }
    const dao = new helper.FirestoreDao(user)
    await dao.deleteVideoFromPlaylistGroup(videoId)
    await dao.deleteVideo(videoId)
    return args.id
  },
  async video(_, args, ctx: NextPageContext): Promise<any> {
    const user = extractUserSession(ctx)
    if (!user) {
      throw new Error("Permission denied.")
    }
    if (!args.video) {
      throw new Error("Coudn't find an appropriate parameter")
    }
    const video = args.video!
    const dao = new helper.FirestoreDao(user)

    if (video.id) {
      const videoRes = await dao.getVideo(video.id)
      await dao.updateVideo(videoRes.doc, video)
      const playlistsSet = new Set(video.playlists)
      const playlistsRes = await dao.getPlaylistsByVideo(videoRes.doc)

      let alreadyLinkedPlaylistIds: ReadonlyArray<string> = []
      if (playlistsRes !== null) {
        // TODO: this process should be with a transaction.
        for (const playlist of playlistsRes) {
          const currentDuration = videoRes.data.end - videoRes.data.end
          const newDuration = args.video.end - args.video.start
          const currentTotalSec = playlist.totalSec
          const newTotalSec = currentTotalSec - currentDuration + newDuration
          if (playlistsSet.has(playlist.id)) {
            await dao.updatePlaylistTotalSec(playlist.id, newTotalSec)
          } else {
            await dao.deleteVideoFromPlaylist({
              playlist: playlist.id,
              video: video.id,
              duration: video.end - video.start,
            })
            await dao.updatePlaylistTotalSec(
              playlist.id,
              currentTotalSec - currentDuration,
            )
          }
          alreadyLinkedPlaylistIds = [...alreadyLinkedPlaylistIds, playlist.id]
        }
      }
      const alreadyLinkedPlaylistSet = new Set(alreadyLinkedPlaylistIds)
      if (video.playlists) {
        for (const playlistId of video.playlists) {
          if (alreadyLinkedPlaylistSet.has(playlistId)) continue
          await dao.addVideoIntoPlaylist({
            playlist: playlistId,
            video: videoRes.doc,
          })
          await dao.updatePlaylistWithNewInfo({
            playlist: playlistId,
            totalSec: video.end - video.start,
            type: "add",
          })
        }
      }

      return { id: video.id }
    } else {
      const videoRes = await dao.addVideo(video)

      if (video.playlists) {
        for (const playlistId of video.playlists) {
          await dao.addVideoIntoPlaylist({ playlist: playlistId, video: videoRes })
        }
      }
      return { id: videoRes.id }
    }
  },
}

export default { Query, Mutation, Date: ScalarDate }
