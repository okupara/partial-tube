import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"
import TimeRangeText from "./TimeRangeText"
import YoutubeImage from "./YoutubeImage"

type Props = {
  start: number
  end: number
  videoId: string
  imageWidth: number
  timeFontSize: BoxProps["fontSize"]
}

const PartialVideoThumb = ({
  start,
  end,
  videoId,
  imageWidth,
  timeFontSize,
}: Props) => (
  <Box position="relative" width={imageWidth} borderRadius="md" overflow="hidden">
    <YoutubeImage
      youtubeImageSize="mqdefault"
      width={imageWidth}
      videoId={videoId}
    />
    <Box
      position="absolute"
      bottom={0}
      backgroundColor="rgb(0, 0, 0, 0.7)"
      width="100%"
    >
      <TimeRangeText color="#fff" start={start} end={end} fontSize={timeFontSize} />
    </Box>
  </Box>
)

export default PartialVideoThumb
