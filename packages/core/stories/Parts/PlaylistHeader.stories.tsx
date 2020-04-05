import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistHeader } from "../../src/components/Parts/PlaylistHeader"

export const playlistHeader = () => (
  <PlaylistHeader
    lastUpdate={new Date()}
    title="This is the test title do you understand?"
    numOfVids={8}
    comment="comment commenbt comment"
    totalPlaySec={24}
  />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
