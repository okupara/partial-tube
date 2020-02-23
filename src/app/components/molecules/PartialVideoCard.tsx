import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/core"
import YoutubeImage from "../molecules/YoutubeImage"
import TimeRangeText from "../molecules/TimeRangeText"

type Props = {
  title: string
  start: number
  end: number
  youtubeId: string
  comment: string
}

const PartialVideoCard: React.FC<Props> = props => (
  <Box p={5} shadow="sm" borderWidth="1px" borderRadius={4}>
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
  </Box>
)
export default PartialVideoCard
