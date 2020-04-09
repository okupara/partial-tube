import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistSelect } from "../../src/components/Parts/PlaylistSelect"
import { playlistOptions } from "../../__mocks__/PlaylistOptions"

export const selectPlaylist = () => <PlaylistSelect playlists={playlistOptions} />

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
