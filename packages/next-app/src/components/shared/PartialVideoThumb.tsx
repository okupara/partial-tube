import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"
import { TimeRangeText } from "../shared/TimeRangeText"
import { YoutubeImage } from "./YoutubeImage"

type Props = {
  start: number
  end: number
  videoId: string
  timeFontSize: BoxProps["fontSize"]
}

export const PartialVideoThumb = ({ start, end, videoId, timeFontSize }: Props) => (
  <Box position="relative" borderRadius="md" overflow="hidden">
    <YoutubeImage youtubeImageSize="mqdefault" videoId={videoId} />
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
