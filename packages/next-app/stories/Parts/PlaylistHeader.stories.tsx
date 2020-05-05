import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistHeader } from "../../src/components/Parts/PlaylistHeader"

export const playlistHeader = () => (
  <PlaylistHeader
    id="hoge"
    lastUpdate={new Date()}
    title="This is the test title do you understand?"
    numOfVideos={8}
    comment="comment commenbt comment"
    totalSec={24}
  />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
