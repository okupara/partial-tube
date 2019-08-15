import * as t from 'io-ts'
import * as id from './Id'
import * as gqlt from './GraphQLTypes'

export namespace PlayItem {
  type NeededFileds = Pick<gqlt.PlayItem, 'id' | 'videoId'>
  type NeededFieldsMixed = gqlt.MixedType<NeededFileds>
  export const runtimeType: t.Type<NeededFileds> = t.type<NeededFieldsMixed>({
    id: id.PlayItem.Id,
    videoId: t.string
  })
  export const create = runtimeType.decode
  export type Type = t.TypeOf<typeof runtimeType>
}

export namespace Playlist {
  type NeededFields = Pick<
    gqlt.Playlist,
    'id' | 'title' | 'description' | 'items'
  >
  type NeededFieldsMixed = gqlt.MixedType<NeededFields>
  export const runtimeType: t.Type<NeededFields> = t.type<NeededFieldsMixed>({
    id: id.Playlist.Id,
    title: t.string,
    description: t.string,
    items: t.array(PlayItem.runtimeType)
  })

  export const create = runtimeType.decode
  export type Type = t.TypeOf<typeof runtimeType>
}

const runtimeType: t.Type<gqlt.PlaylistCollection> = t.type<
  gqlt.ParamedPlaylistCollection
>({
  items: t.array<typeof Playlist.runtimeType>(Playlist.runtimeType),
  count: t.number
})
export type Type = t.TypeOf<typeof runtimeType>
export const create = runtimeType.decode
