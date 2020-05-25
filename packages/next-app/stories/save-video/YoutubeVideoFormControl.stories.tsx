import * as React from "react"
import { MarginDecorator } from "../Decorators"
import { YoutubeVideoFormControl } from "../../src/components/save-video/YoutubeVideoFormControl"

export const youtubeVideoFormControl = () => {
  return <YoutubeVideoFormControl onGetVideoId={() => {}} />
}

youtubeVideoFormControl.story = {
  name: "YoutubeVideoFormControl",
}

export default {
  title: "save-video|parts/",
  decorators: [MarginDecorator],
}
