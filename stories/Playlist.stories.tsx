import React from "react"
import { PlaylistCard } from "../src/app/components/molecules/PlaylistCard"
import { MarginDecorator } from "./Decorators"
import { mocks } from "../mocks/PlaylistCollection"
import { PlaylistCollection } from "../src/app/components/organisms/PlaylistCollection"

export const playListCard = () => <PlaylistCard {...mocks[0]} />
export const playListCollection = () => (
  <PlaylistCollection playlistCollection={mocks} />
)

export default {
  title: "Playlist",
  decorators: [MarginDecorator],
}
