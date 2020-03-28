import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/core"
import { YoutubeImage } from "../molecules/YoutubeImage"
import { Card } from "../atoms/Card"
import { ItemCountText } from "../molecules/ItemCountText"
import { DateText } from "../molecules/DateText"

export type Props = {
  title: string
  comment: string
  cnt: number
  firstVideoId: string
  updated: Date
}

export const PlaylistCard: React.FC<Props> = props => (
  <Card>
    <Flex>
      <Box>
        <YoutubeImage
          youtubeImageSize="mqdefault"
          width={200}
          videoId={props.firstVideoId}
        />
      </Box>
      <Flex flexDirection="column" ml={4}>
        <Heading size="md" as="h3">
          {props.title}
        </Heading>
        <Flex>
          <ItemCountText count={props.cnt} />
          <Flex ml={4}>
            <Text>Last added :</Text>
            <Box ml={2}>
              <DateText date={props.updated} />
            </Box>
          </Flex>
        </Flex>
        <Text>{props.comment}</Text>
      </Flex>
    </Flex>
  </Card>
)
