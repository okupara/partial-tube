import * as React from "react"
import {
  PartialVideo as GQLDefVideo,
  Playlist as GQLDefPlaylist,
} from "../graphql/type-defs.graphqls"
import { useLoginUser } from "../contexts/LoginUser"
import { Box, Flex, Stack, MenuItem } from "@chakra-ui/core"
import { VideoItem } from "../components/videos/VideoItem"
import { PlaylistHeader } from "../components/playlists/PlaylistHeader"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Card } from "../components/shared/Card"
import { DeleteLabel, EditLabel } from "../components/shared/MenuLabels"

type Props = {
  onPlay?: (playlistId: string) => void
  playlistId: string
}
export const Playlist = (props: Props) => {
  const { data } = useQuery<Playlist<GQLPlaylist>>(query, {
    variables: { id: props.playlistId },
  })
  const userContext = useLoginUser()
  if (!userContext.user) throw new Error("Unexpectedly, user is null")

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
          <Stack spacing={6}>
            {playlist.videos.map((v) => (
              <Box key={v.id}>
                <Card
                  menuItems={() => [
                    <MenuItem key="edit">
                      <EditLabel />
                    </MenuItem>,
                    <MenuItem key="delete">
                      <DeleteLabel />
                    </MenuItem>,
                  ]}
                >
                  <VideoItem {...v} />
                </Card>
              </Box>
            ))}
          </Stack>
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
