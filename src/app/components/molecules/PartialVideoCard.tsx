import React from "react"
import { Flex, Heading } from "@chakra-ui/core"
import Card from "../atomic/Card"
import CommentIconText from "../molecules/CommentIconText"
import PartialVideoThumb from "../molecules/PartialVideoThumb"

export type Props = {
  title: string
  start: number
  end: number
  videoId: string
  comment: string
  mb?: number
}

const PartialVideoCard: React.FC<Props> = props => (
  <Card>
    <Flex>
      <PartialVideoThumb
        videoId={props.videoId}
        imageWidth={200}
        start={props.start}
        end={props.end}
        timeFontSize="md"
      />
      {/* <Box position="relative">
        <YoutubeImage youtubeImageSize="mqdefault" width={200} videoId={props.videoId} />
        <Box position="absolute" bottom={0} backgroundColor="rgb(0, 0, 0, 0.7)" width="100%">
          <TimeRangeText color="#fff" start={props.start} end={props.end} />
        </Box>
      </Box> */}
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
