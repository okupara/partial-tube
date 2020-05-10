import React from "react"
import { Grid, Box, Heading } from "@chakra-ui/core"
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
  onClickCard?: (id: string) => void // to move the update page
}

export const PartialVideoCard = (props: Props) => (
  <Card onClick={() => props.onClickCard?.(props.id)}>
    <Grid
      gridTemplateColumns="200px 1fr"
      gridTemplateRows="min-content 1fr"
      gridTemplateAreas={`
        "areaA areaB"
        "areaA areaC"
      `}
      gridRowGap={2}
      gridColumnGap={4}
    >
      <Box gridArea="areaA">
        <PartialVideoThumb
          videoId={props.videoId}
          start={props.start}
          end={props.end}
          timeFontSize="md"
        />
      </Box>
      <Box gridArea="areaB">
        <Heading size="md" as="h3">
          {props.title}
        </Heading>
      </Box>
      <Box gridArea="areaC">
        <CommentIconText text={props.comment} />
      </Box>
    </Grid>
  </Card>
)
