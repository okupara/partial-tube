// import * as IO from 'io-ts'
import { BaseStringId, createIdType } from './Id'
// import * as User from './User'
// import { DateFromStringType } from './core/DateFromString'

// export namespace PartialVideo {
//   export const IdTag = 'PartialVideoId'
//   export type Id = { tag: typeof IdTag } & BaseStringId
//   export const Id = createIdType<Id>(i => ({ tag: IdTag, value: i }))
//   export const IOType = IO.type({
//     id: Id,
//     title: IO.string,
//     description: IO.string,
//     start: IO.number,
//     end: IO.number,
//     videoId: IO.string,
//     order: IO.number,
//     created: DateFromStringType,
//     userId: User.Id
//   })

//   export type Type = IO.TypeOf<typeof IOType>
//   export const create = IOType.decode
//   export const encode = IOType.encode
// }

// export namespace PartialVideoCollection {
//   export const IdTag = 'PartialVideoCollectionId'
//   export type Id = { tag: typeof IdTag } & BaseStringId
//   export const Id = createIdType<Id>(i => ({ tag: IdTag, value: i }))
// }

export namespace Video {
  const IdTag = 'VideoId'
  export type Id = { tag: typeof IdTag } & BaseStringId
  export const Id = createIdType<Id>(i => ({ tag: IdTag, value: i }))
}
export namespace PartialVideo {
  const IdTag = 'PartialVideoId'
  export type Id = { tag: typeof IdTag } & BaseStringId
  export const Id = createIdType<Id>(i => ({ tag: IdTag, value: i }))
}
