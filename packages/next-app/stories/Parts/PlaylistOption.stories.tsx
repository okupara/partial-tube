import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistOption } from "../../src/components/Parts/PlaylistOption"

export const playlistOption = () => (
  <PlaylistOption id="12345" name="testtestste" permission="public" added={false} />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
