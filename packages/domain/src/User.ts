import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Either'

namespace Id {
  export type Type = {
    tag: 'userId'
    value: string
  }
  export const create = (value: string): Type => ({ tag: 'userId', value })
}

export interface Record {
  userId: Id.Type
  name: string
  avatarUrl: string | null
}

interface ExpectedInput {
  userId: string
  name: string
  avatarUrl: string | null
}

const IdType = new t.Type(
  'id-object',
  (u): u is string => typeof u === 'string' && u.length > 0,
  (input, context) =>
    typeof input === 'string' ? t.success(input) : t.failure(input, context),
  (v): Id.Type => ({ tag: 'userId', value: v })
)

const validator: t.Type<ExpectedInput, Record> = t.type({
  userId: IdType,
  name: t.string,
  avatarUrl: t.union([t.string, t.null])
})

export const create = (anything: unknown) =>
  pipe(
    validator.decode(anything),
    map<ExpectedInput, Record>(({ name, userId, avatarUrl }) => ({
      name,
      avatarUrl,
      userId: Id.create(userId)
    }))
  )
