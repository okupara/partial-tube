import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistOption } from "../../src/components/Parts/PlaylistOption"

export const playlistOption = () => (
  <PlaylistOption name="testtestste" permission="public" />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
