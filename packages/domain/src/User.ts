import * as t from 'io-ts'
import { BaseStringId, createIdType } from './Id'

export const IdTag = 'UserId'
export type Id = { tag: typeof IdTag } & BaseStringId
export const Id = createIdType<Id>(i => ({ tag: IdTag, value: i }))

// TODO: userId should be just "id"...
export const IOType = t.type({
  userId: Id,
  name: t.string,
  avatarUrl: t.union([t.string, t.null])
})

export type Record = t.TypeOf<typeof IOType>

export const create = IOType.decode
export const encode = IOType.encode
