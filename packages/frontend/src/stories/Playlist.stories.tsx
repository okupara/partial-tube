import React from 'react'
import Playlist from 'components/molecules/Playlist'
import { pattern1 } from '__mocks__/Playlist'

export const playlist = () => <Playlist playList={pattern1()} />

export default {
  title: 'Playlist'
}
