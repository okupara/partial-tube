import * as React from "react"
import gql from "graphql-tag"
import { Box, Skeleton as ChakraSkeleton } from "@chakra-ui/core"
import { VideoForm } from "../components/save-video/VideoForm"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import { PartialVideo } from "../graphql/type-defs.graphqls"
import { Props } from "@storybook/addon-docs/blocks"

type Props = {
  video: GQLVideo | null
  id: string
}
export const EditVideo = ({ id }: Props) => {
  const { data } = useEditVideo(id)
  return (
    <Skeleton isLoaded={!!data}>
      {data ? (
        <Box px={8}>
          <VideoForm
            id={id}
            videoId={data.video.videoId}
            title={data.video.title}
            start={data.video.start}
            end={data.video.end}
            comment={data.video.comment || ""}
            playlists={data.video.playlists as ReadonlyArray<GQLPlaylist>}
          />
        </Box>
      ) : null}
    </Skeleton>
  )
}

const useEditVideo = (playlistId: string) => {
  const res = useQuery<QueryVideo<GQLVideo>>(query, {
    variables: { id: playlistId },
  })
  const client = useApolloClient()
  React.useEffect(() => {
    if (res.data) {
      // needs a special treatment...
      client.writeData({ data: { selectedPlaylists: res.data.video.playlists } })
    }
  }, [res.data])
  return res
}

export const query = gql`
  query Video($id: String!) {
    video(id: $id) {
      id
      videoId
      title
      start
      end
      comment
      playlists {
        id
        name
        permission
      }
    }
  }
`
export type GQLVideo = Pick<
  PartialVideo,
  "id" | "videoId" | "title" | "start" | "end" | "comment" | "playlists"
>

type SkeletonProps = {
  isLoaded: boolean
}
const Skeleton: React.FC<SkeletonProps> = (props) => {
  const width = props.isLoaded ? "auto" : "640px"
  return (
    <Box>
      <ChakraSkeleton
        width={width}
        height={props.isLoaded ? "auto" : "360px"}
        m="auto"
        isLoaded={props.isLoaded}
      >
        {props.children}
      </ChakraSkeleton>
      <ChakraSkeleton
        width="640px"
        height={props.isLoaded ? "auto" : 6}
        my={props.isLoaded ? 0 : 3}
        mx="auto"
        isLoaded={props.isLoaded}
      />
    </Box>
  )
}
