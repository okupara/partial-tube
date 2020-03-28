import React from "react"
import { Flex, Heading } from "@chakra-ui/core"
import { Card } from "../atoms/Card"
import { CommentIconText } from "../molecules/CommentIconText"
import { PartialVideoThumb } from "../molecules/PartialVideoThumb"

export type Props = {
  title: string
  start: number
  end: number
  videoId: string
  comment: string
  mb?: number
}

export const PartialVideoCard: React.FC<Props> = props => (
  <Card>
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
