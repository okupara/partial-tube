import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { CommentIconText } from "../shared/CommentIconText"
import { PartialVideoThumb } from "../shared/PartialVideoThumb"

export type Props = {
  videoId: string
  comment?: string | null
  start: number
  end: number
  playing: boolean
}

export const TinyVideoCard = ({ videoId, comment, start, end, playing }: Props) => (
  <Box>
    <Flex
      width="140px"
      flexDirection="column"
      backgroundColor={playing ? "gray.200" : "transparent"}
      p={2}
      borderRadius={playing ? 4 : 0}
    >
      <Box position="relative">
        <PartialVideoThumb
          videoId={videoId}
          start={start}
          end={end}
          timeFontSize="sm"
        />
      </Box>
      <Box>
        <CommentIconText text={comment ?? ""} fontSize="sm" />
      </Box>
    </Flex>
  </Box>
)
