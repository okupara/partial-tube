import React from "react"
import { Box, Stack } from "@chakra-ui/core"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { PartialVideo as GQLDefVideo } from "../graphql/typ-defs.graphqls"
import { PartialVideoCard } from "../components/Card/PartialVideoCard"

type Props = {
  onClickCard?: (id: string) => void
}

export const Videos = (_: Props) => {
  const { data, error } = useQuery<QueryVideos<GQLVideo>>(query)
  console.log("DATA", data, error)
  if (!data) {
    return null
  }

  return (
    <Box px={6}>
      <Stack spacing={6}>
        {data.videos.map((v) => (
          <Box key={v.id}>
            <PartialVideoCard
              id={v.id}
              videoId={v.videoId}
              start={v.start}
              end={v.end}
              comment={v.comment ?? ""}
              title={v.title}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

const query = gql`
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
type GQLVideo = Pick<
  GQLDefVideo,
  "id" | "title" | "start" | "end" | "comment" | "created" | "videoId"
>
