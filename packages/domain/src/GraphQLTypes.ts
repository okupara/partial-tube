import * as IO from 'io-ts'
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

export type ParamedPlayItem = { [k in keyof PlayItem]: IO.Mixed }

export type Playlist = {
  id: string
  title: string
  userId: string
  description: string
  items: PlayItem[]
  sort: number
  created: string
}

export type ParamedPlaylist = { [K in keyof Playlist]: IO.Mixed }

export type PlaylistCollection = {
  items: Playlist[]
  count: number
}

export type ParamedPlaylistCollection = {
  [K in keyof PlaylistCollection]: IO.Mixed
}

export type MixedType<T> = { [k in keyof T]: IO.Mixed }

export namespace Video {
  export const TimeRangeIOType = IO.type({
    start: IO.number,
    end: IO.number
  })
  export type TimeRangeType = IO.TypeOf<typeof TimeRangeIOType>
  export const VideoIOType = IO.type({
    id: IO.string,
    title: IO.string,
    description: IO.string,
    playranges: IO.array(TimeRangeIOType),
    videoId: IO.string
  })
  export type Type = IO.TypeOf<typeof VideoIOType>
  export const create = VideoIOType.decode
}

export namespace Videos {
  export const IOType = IO.array(Video.VideoIOType)
  export type Type = IO.TypeOf<typeof IOType>
  export const create = IOType.decode
  export type ParamedType = {
    [K in keyof Type]: IO.Mixed
  }
}
