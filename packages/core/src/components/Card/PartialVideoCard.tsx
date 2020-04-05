import React from "react"
import { Flex, Heading } from "@chakra-ui/core"
import { Card } from "../Card/Card"
import { CommentIconText } from "../Text/CommentIconText"
import { PartialVideoThumb } from "../Thumbnail/PartialVideoThumb"

export type Props = {
  id: string
  title: string
  start: number
  end: number
  videoId: string
  comment: string
  mb?: number
  onClickCard?: (id: string) => void // to move the update page
}

export const PartialVideoCard: React.FC<Props> = (props) => (
  <Card onClick={() => props.onClickCard?.(props.id)}>
    <Flex>
      <PartialVideoThumb
        videoId={props.videoId}
        imageWidth={200}
        start={props.start}
        end={props.end}
        timeFontSize="md"
      />
      <Flex flexDirection="column" ml={4}>
        <Heading size="md" as="h3">
          {props.title}
        </Heading>
        <CommentIconText text={props.comment} />
      </Flex>
    </Flex>
  </Card>
)
