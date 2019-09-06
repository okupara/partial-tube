import * as t from 'io-ts'
// type GraphQLData = { [key: string]: any }

// interface Verify<T extends Object> {
//   verify: T
// }

export type PlayItem = {
  id: string
  title: string
  videoId: string
  startSec: number
  endSec: number
  description: string | null
  created: string
}

export type ParamedPlayItem = { [k in keyof PlayItem]: t.Mixed }

export type Playlist = {
  id: string
  title: string
  userId: string
  description: string
  items: PlayItem[]
  sort: number
  created: string
}

export type ParamedPlaylist = { [K in keyof Playlist]: t.Mixed }

export type PlaylistCollection = {
  items: Playlist[]
  count: number
}

export type ParamedPlaylistCollection = {
  [K in keyof PlaylistCollection]: t.Mixed
}

export type MixedType<T> = { [k in keyof T]: t.Mixed }
