import React from "react"
import { YoutubePlayer } from "../src/app/components/molecules/YoutubePlayer"

export const machinetest = () => (
  <YoutubePlayer
    onEnd={() => {
      console.log("HELLO")
    }}
    partialVideoId="kjsdkfjaksdjf"
    videoId="mQSbaGNzNzc"
    start={300}
    end={308}
  />
)

export default {
  title: "Player",
}
