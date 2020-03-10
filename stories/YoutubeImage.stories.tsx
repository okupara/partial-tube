import React from "react"
import YoutubeImage from "../src/app/components/molecules/YoutubeImage"
import { Margin } from "./MarginDecorator"

export const mediumImage = () => (
  <YoutubeImage youtubeImageSize="mqdefault" width={200} videoId="w4A1CHEpqvw" />
)
export const smallImage = () => (
  <YoutubeImage youtubeImageSize="default" width={100} videoId="w4A1CHEpqvw" />
)

export default {
  title: "Youtube Image",
  decorators: [Margin],
}
