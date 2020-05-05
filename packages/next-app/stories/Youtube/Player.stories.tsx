import React from "react"
import { Box, Text } from "@chakra-ui/core"
import { YoutubePlayer } from "../../src/components/YoutubePlayer"

const YoutubeComponent = () => {
  const [time, setTime] = React.useState(0)
  return (
    <Box>
      <YoutubePlayer
        onEnd={() => {
          console.log("hello")
        }}
        id="kjsdkfjaksdjf"
        videoId="mQSbaGNzNzc"
        onPlayerTimer={(sec) => setTime(sec)}
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
    id="kjsdkfjaksdjf"
    videoId="mQSbaGNzNzc"
    start={300}
    end={308}
  />
)

export default {
  title: "Player",
}
