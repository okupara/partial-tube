import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/core"
import { YoutubeImage } from "../Thumbnail/YoutubeImage"
import { Card } from "../Card/Card"
import { ItemCountText } from "../Text/ItemCountText"
import { DateText } from "../Text/DateText"

export type Props = {
  title: string
  comment: string
  cnt: number
  firstVideoId: string
  updated: Date
}

export const PlaylistCard: React.FC<Props> = (props) => (
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
