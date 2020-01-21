import gql from 'graphql-tag'
import * as IO from 'io-ts'
import * as PVModels from '@partial-tube/domain/lib/PartialVideo'
import { DateFromStringType } from '@partial-tube/domain/lib/core/DateFromString'
import * as User from '@partial-tube/domain/lib/User'

export const query = gql`
  query {
    getVideos {
      videoId
      items {
        id
        title
        description
        start
        end
        created
        order
      }
    }
  }
`
type Data<T> = {
  getVideos: T
}

export type UnvalidatedData = Data<unknown>
export type ValidtedData = Data<VideoCollection>

export const PartialVideo = IO.type({
  // id: PVModels.PartialVideo.Id,
  description: IO.string,
  start: IO.number,
  end: IO.number,
  order: IO.number,
  created: DateFromStringType,
  userId: User.Id
})
export type PartialVideo = IO.TypeOf<typeof PartialVideo>

export const Video = IO.type({
  id: PVModels.PartialVideo.Id,
  videoId: IO.string,
  items: IO.array(PartialVideo),
  title: IO.string,
  created: DateFromStringType
})
export type Video = IO.TypeOf<typeof Video>

export const VideoCollection = IO.type({
  items: IO.array(Video)
})
export type VideoCollection = IO.TypeOf<typeof VideoCollection>
