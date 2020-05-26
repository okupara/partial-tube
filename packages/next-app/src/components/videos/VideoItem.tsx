import * as React from "react"
import { Heading } from "@chakra-ui/core"
import { CommentIconText } from "../shared/CommentIconText"
import { PartialVideoThumb } from "../shared/PartialVideoThumb"
import { GridImageTitleDesc } from "../../components/shared/GridImageTitleDesc"

export type Props = {
  id: string
  title: string
  start: number
  end: number
  videoId: string
  comment?: string | null
}

const Component = (props: Props) => (
  <GridImageTitleDesc
    iconView={() => (
      <PartialVideoThumb
        videoId={props.videoId}
        start={props.start}
        end={props.end}
        timeFontSize="md"
      />
    )}
    titleView={() => (
      <Heading size="md" as="h3">
        {props.title}
      </Heading>
    )}
    descView={() => <CommentIconText text={props.comment ?? ""} />}
  />
)

export const VideoItem = React.memo(Component)
