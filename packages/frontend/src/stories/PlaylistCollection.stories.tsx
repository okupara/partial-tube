import React from 'react'
import PlaylistCollection from 'components/organisms/PlaylistCollection'
import { createUsual } from '__mocks__/PlaylistCollection'

export const playlistCollection = () => (
  <PlaylistCollection collection={createUsual()} />
)

export default {
  title: 'PlaylistCollection'
}
