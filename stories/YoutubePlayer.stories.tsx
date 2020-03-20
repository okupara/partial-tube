import React from "react"
import { Box, Text } from "@chakra-ui/core"
import { YoutubePlayer } from "../src/app/components/molecules/YoutubePlayer"

const YoutubeComponent = () => {
  const [time, setTime] = React.useState(0)
  return (
    <Box>
      <YoutubePlayer
        onEnd={() => {
          console.log("hello")
        }}
        partialVideoId="kjsdkfjaksdjf"
        videoId="mQSbaGNzNzc"
        onPlayerTimer={sec => setTime(sec)}
      />
      <Text>{time}</Text>
    </Box>
  )
}

export const youtubePlayer = () => <YoutubeComponent />

export const youtubePlayerWithRange = () => (
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
