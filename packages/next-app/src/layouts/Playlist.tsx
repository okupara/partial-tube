import React from "react"
import {
  PartialVideo as GQLDefVideo,
  Playlist as GQLDefPlaylist,
} from "../graphql/type-defs.graphqls"
import { StackList } from "../components/List/StackList"
import { useLoginUser } from "../contexts/LoginUser"
import { Box, Flex } from "@chakra-ui/core"
import { PartialVideoCard } from "../components/Card/PartialVideoCard"
import { PlaylistHeader } from "../components/Parts/PlaylistHeader"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  onPlay?: (playlistId: string) => void
  playlistId: string
}
export const Playlist = (props: Props) => {
  const { data, error } = useQuery<Playlist<GQLPlaylist>>(query, {
    variables: { id: props.playlistId },
  })
  const userContext = useLoginUser()
  if (!userContext.user) throw new Error("Unexpectedly, user is null")
  console.log("DA", data, error)

  const playlist = data ? data.playlist : null

  return (
    playlist && (
      <Flex flexDirection="column" px={6} pb={10}>
        <Box>
          <PlaylistHeader
            id={playlist.id}
            title={playlist.name}
            totalSec={playlist.totalSec}
            lastUpdate={new Date()}
            comment={playlist.comment ?? ""}
            numOfVideos={playlist.numOfVideos}
            onClickPlay={props.onPlay}
          />
        </Box>
        <Box mt={6}>
          <StackList
            list={playlist.videos}
            component={(p) => (
              <PartialVideoCard
                id={p.id}
                title={p.title}
                videoId={p.videoId}
                comment={p.comment ?? ""}
                start={p.start}
                end={p.end}
              />
            )}
          />
        </Box>
      </Flex>
    )
  )
}

const query = gql`
  query Playlist($id: String!) {
    playlist(id: $id) {
      id
      name
      comment
      numOfVideos
      totalSec
      videos {
        id
        start
        end
        videoId
        title
        comment
      }
    }
  }
`
type GQLVideo = Omit<GQLDefVideo, "uid">
type GQLPlaylist = Pick<
  GQLDefPlaylist,
  "id" | "name" | "comment" | "numOfVideos" | "totalSec"
> & { videos: ReadonlyArray<GQLVideo> }
