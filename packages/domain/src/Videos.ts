import * as IO from 'io-ts'
import { BaseStringId, createIdType } from './Id'

export namespace Timerange {
  export const IOType = IO.type({
    start: IO.number,
    end: IO.number
  })
  export type Type = IO.TypeOf<typeof IOType>
}

export namespace Video {
  const tag = 'VideoId'
  export type Id = { tag: typeof tag } & BaseStringId
  export const Id = createIdType<Id>(i => ({ tag, value: i }))
  export const VideoIOType = IO.type({
    id: Id,
    title: IO.string,
    description: IO.string,
    playranges: IO.array(Timerange.IOType),
    videoId: IO.string
  })
  export type Type = IO.TypeOf<typeof VideoIOType>
  export const create = VideoIOType.decode
}

export namespace Videos {
  export const IOType = IO.array(Video.VideoIOType)
  export type Type = IO.TypeOf<typeof IOType>
  export const create = IOType.decode
  export const encode = IOType.encode
}
