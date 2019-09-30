import * as t from 'io-ts'
import { BaseStringId, createIdType } from './Id'

const tag = 'UserId'
export type Id = { tag: typeof tag } & BaseStringId
export const Id = createIdType<Id>(i => ({ tag, value: i }))

// TODO: userId should be just "id"...

export const IOType = t.type({
  userId: Id,
  name: t.string,
  avatarUrl: t.union([t.string, t.null])
})

export type Record = t.TypeOf<typeof IOType>

export const create = IOType.decode
export const encode = IOType.encode
