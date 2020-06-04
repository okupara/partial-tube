import * as React from "react"
import gql from "graphql-tag"
import { Box } from "@chakra-ui/core"
import { VideoForm } from "../components/save-video/VideoForm"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import { PartialVideo } from "../graphql/type-defs.graphqls"

type Props = {
  video: GQLVideo
  id: string
}
export const EditVideo = ({ id }: Props) => {
  const { data } = useEditVideo(id)
  return data ? (
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
  ) : null
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
