import React from "react"
import { Box, Flex, Heading } from "@chakra-ui/core"
import YoutubeImage from "../molecules/YoutubeImage"
import TimeRangeText from "../molecules/TimeRangeText"
import Card from "../atomic/Card"
import CommentIconText from "../molecules/CommentIconText"

export type Props = {
  title: string
  start: number
  end: number
  youtubeId: string
  comment: string
  mb?: number
}

const PartialVideoCard: React.FC<Props> = props => (
  <Card>
    <Flex>
      <Box position="relative">
        <YoutubeImage youtubeId={props.youtubeId} />
        <Box position="absolute" bottom={0} backgroundColor="rgb(0, 0, 0, 0.7)" width="100%">
          <TimeRangeText color="#fff" start={props.start} end={props.end}>
            00:20 - 01:20
          </TimeRangeText>
        </Box>
      </Box>
      <Flex flexDirection="column" ml={4}>
        <Heading size="md" as="h3">
          {props.title}
        </Heading>
        <CommentIconText text={props.comment} />
      </Flex>
    </Flex>
  </Card>
)
export default PartialVideoCard
