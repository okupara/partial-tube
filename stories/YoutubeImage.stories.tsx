import React from "react"
import YoutubeImage from "../src/app/components/molecules/YoutubeImage"
import { Margin } from "./MarginDecorator"

export const youtubeImage = () => <YoutubeImage youtubeId="w4A1CHEpqvw" />

export default {
  title: "Youtube Image",
  decorators: [Margin],
}
