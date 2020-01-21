// so far, I don't think the id which we should deal them as a Number comes
// I assume all of id that I use in this app are String
import * as t from 'io-ts'
import * as FilledString from './core/FilledString'

const BaseStringId = t.type({ value: FilledString.IOType })

export type BaseStringId = t.TypeOf<typeof BaseStringId>

export const createIdType = <T extends BaseStringId>(
  f: (i: BaseStringId['value']) => T
) => {
  const StringId = new t.Type<T, string, string>(
    'StringId',
    (i): i is T => BaseStringId.is(i),
    (i, c) =>
      FilledString.IOType.is(i) ? t.success<T>(f(i)) : t.failure(i, c),
    a => a.value
  )
  return FilledString.IOType.pipe(StringId)
}

export namespace PlayItem {
  export type Id = { tag: 'PlayItemId' } & BaseStringId
  export const Id = createIdType<Id>(i => ({ tag: 'PlayItemId', value: i }))
  export const create = Id.decode
}
export namespace Playlist {
  export type Id = { tag: 'PlaylistId' } & BaseStringId
  export const Id = createIdType<Id>(i => ({ tag: 'PlaylistId', value: i }))
  export const create = Id.decode
}
