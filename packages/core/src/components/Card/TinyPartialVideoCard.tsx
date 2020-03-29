import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { CommentIconText } from "../Text/CommentIconText"
import { PartialVideoThumb } from "../Thumbnail/PartialVideoThumb"

export type Props = {
  videoId: string
  comment: string
  start: number
  end: number
}

export const TinyPartialVideoCard = ({ videoId, comment, start, end }: Props) => (
  <Flex width="140px" flexDirection="column">
    <Box>
      <PartialVideoThumb
        videoId={videoId}
        start={start}
        end={end}
        imageWidth={140}
        timeFontSize="sm"
      />
    </Box>
    <Box>
      <CommentIconText text={comment} fontSize="sm" />
    </Box>
  </Flex>
)
