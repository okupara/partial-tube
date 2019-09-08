import * as t from 'io-ts'
import { BaseStringId, createIdType } from './Id'

const tag = 'UserId'
export type Id = { tag: typeof tag } & BaseStringId
export const Id = createIdType<Id>(i => ({ tag, value: i }))

export const runtimeType = t.type({
  userId: Id,
  name: t.string,
  avatarUrl: t.union([t.string, t.null])
})

export type Record = t.TypeOf<typeof runtimeType>

export const create = runtimeType.decode
