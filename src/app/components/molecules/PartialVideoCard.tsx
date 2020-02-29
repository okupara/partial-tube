import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/core"
import YoutubeImage from "../molecules/YoutubeImage"
import TimeRangeText from "../molecules/TimeRangeText"
import Card from "../atomic/Card"

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
      <Box>
        <YoutubeImage youtubeId={props.youtubeId} />
      </Box>
      <Flex flexDirection="column" ml={4}>
        <Heading size="md" as="h3">
          {props.title}
        </Heading>
        <TimeRangeText start={props.start} end={props.end} />
        <Text>{props.comment}</Text>
      </Flex>
    </Flex>
  </Card>
)
export default PartialVideoCard