import React from "react"
import { MarginDecorator } from "../Decorators"
import { PlaylistOption } from "../../src/components/save-video/PlaylistOption"

export const playlistOption = () => (
  <PlaylistOption id="12345" name="testtestste" permission="public" added={false} />
)

export default {
  title: "save-video|parts/",
  decorators: [MarginDecorator],
}
