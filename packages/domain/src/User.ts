import * as t from 'io-ts'
export interface Record {
  name: string
  avatarUrl: string | null
}

const validator: t.Type<Record> = t.type({
  name: t.string,
  avatarUrl: t.union([t.string, t.null])
})
// MEMO: supposed to be used like below,
// import * as User from "..."
// User.create(something)
export const create = (anything: unknown) => validator.decode(anything)
