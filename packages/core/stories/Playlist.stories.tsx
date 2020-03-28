import React from "react"
import { PlaylistCard } from "../src/components/molecules/PlaylistCard"
import { MarginDecorator } from "./Decorators"
import { mocks } from "../__mocks__/PlaylistCollection"
import { PlaylistCollection } from "../src/components/organisms/PlaylistCollection"

export const playListCard = () => <PlaylistCard {...mocks[0]} />
export const playListCollection = () => (
  <PlaylistCollection playlistCollection={mocks} />
)

export default {
  title: "Playlist",
  decorators: [MarginDecorator],
}
