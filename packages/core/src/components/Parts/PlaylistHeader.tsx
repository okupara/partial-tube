import React from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/core"
import { ItemCountText } from "../Text/ItemCountText"
import { DateText } from "../Text/DateText"
import { CommentIconText } from "../Text/CommentIconText"
import { TimeText } from "../Text/TimeText"

export type Props = {
  numOfVids: number
  title: string
  lastUpdate: Date
  comment: string
  totalPlaySec: number
}

export const PlaylistHeader = (props: Props) => (
  <Flex flexDirection="column">
    <Box>
      <Heading as="h1" fontSize="lg">
        {props.title}
      </Heading>
    </Box>
    <Flex ml={2} mt={2}>
      <Box>
        <ItemCountText count={props.numOfVids} />
      </Box>

      <Box ml={5}>
        <Text>total: </Text>
      </Box>
      <Box ml={2}>
        <TimeText sec={props.totalPlaySec} />
      </Box>

      <Box ml={5}>
        <Text>Last update:</Text>
      </Box>
      <Box ml={2}>
        <DateText date={props.lastUpdate} />
      </Box>
    </Flex>
    <Box ml={2} mt={2}>
      <CommentIconText text={props.comment} />
    </Box>
  </Flex>
)
