import React from "react"
import { Box, Stack } from "@chakra-ui/core"
import gql from "graphql-tag"
import { PartialVideo as GQLDefVideo } from "../graphql/typ-defs.graphqls"
import { PartialVideoCard } from "../components/Card/PartialVideoCard"

type Props = {
  onClickCard?: (id: string) => void
  onClickEditMenu?: (id: string) => void
  videos: ReadonlyArray<GQLVideo>
}

export const Videos = ({ videos, onClickEditMenu }: Props) => {
  return (
    <Box px={6}>
      <Stack spacing={6}>
        {videos.map((v) => (
          <Box key={v.id}>
            <PartialVideoCard {...v} onClickEditMenu={onClickEditMenu} />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export const query = gql`
  query {
    videos {
      id
      title
      videoId
      start
      end
      comment
      created
    }
  }
`
export type GQLVideo = Pick<
  GQLDefVideo,
  "id" | "title" | "start" | "end" | "comment" | "created" | "videoId"
>
