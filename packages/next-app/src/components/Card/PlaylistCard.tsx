import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/core"
import { YoutubeImage } from "../Thumbnail/YoutubeImage"
import { Card } from "../Card/Card"
import { ItemCountText } from "../Text/ItemCountText"
import { TimestampText } from "../Text/TimestampText"

export type Props = {
  id: string
  name: string
  comment?: string | null
  numOfVideos: number
  firstVideoId?: string | null
  updated: number
  onClickCard?: (id: string) => void
}

export const PlaylistCard: React.FC<Props> = (props) => (
  <Card onClick={() => props.onClickCard?.(props.id)}>
    <Flex>
      <Box>
        <YoutubeImage
          youtubeImageSize="mqdefault"
          videoId={props.firstVideoId ?? "I think it should be something..."}
        />
      </Box>
      <Flex flexDirection="column" ml={4}>
        <Heading size="md" as="h3">
          {props.name}
        </Heading>
        <Flex>
          <ItemCountText count={props.numOfVideos} />
          <Flex ml={4}>
            <Text>Last added :</Text>
            <Box ml={2}>
              <TimestampText time={props.updated} />
            </Box>
          </Flex>
        </Flex>
        <Text>{props.comment}</Text>
      </Flex>
    </Flex>
  </Card>
)
