import * as React from "react"
import {
  PartialVideo as GQLDefVideo,
  Playlist as GQLDefPlaylist,
} from "../graphql/type-defs.graphqls"
import { Box, Flex, Stack, MenuItem, Text } from "@chakra-ui/core"
import { VideoItem } from "../components/videos/VideoItem"
import { PlaylistHeader } from "../components/playlists/PlaylistHeader"
import gql from "graphql-tag"
import { useApolloClient } from "@apollo/react-hooks"
import { Card } from "../components/shared/Card"
import { CardMenu } from "../components/shared/CardMenu"
import { DeleteLabel, EditLabel } from "../components/shared/MenuLabels"
import { useDeleteRecord } from "../hooks/useDeleteRecord"
import { AlertDeleteDialog } from "../components/shared/AlertDeleteDialog"

type Props = {
  onPlay?: (playlistId: string) => void
  playlist: GQLPlaylist
}
export const Playlist = ({ playlist, onPlay }: Props) => {
  const deleteState = useDeleteVideoFromPlaylist()

  return (
    playlist && (
      <Flex flexDirection="column" px={6}>
        <Box>
          <PlaylistHeader
            id={playlist.id}
            title={playlist.name}
            totalSec={playlist.totalSec}
            lastUpdate={new Date()}
            comment={playlist.comment ?? ""}
            numOfVideos={playlist.numOfVideos}
            onClickPlay={onPlay}
          />
        </Box>
        <Box mt={6}>
          <Stack spacing={6}>
            {playlist.videos.map((v) => (
              <Box key={v.id}>
                <Card>
                  <CardMenu menuListWidth={240}>
                    <MenuItem>
                      <EditLabel />
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        deleteState.setParameters({
                          videoId: v.id,
                          playlistId: playlist.id,
                        })
                      }
                    >
                      <DeleteLabel title="Delete from this playlist" />
                    </MenuItem>
                  </CardMenu>
                  <VideoItem {...v} />
                </Card>
              </Box>
            ))}
          </Stack>
          <AlertDeleteDialog
            title="Delete video"
            messageView={() => <Text>Do you really want to delete this video?</Text>}
            isOpen={deleteState.readyToDelete}
            onClose={deleteState.resetParameter}
            onSubmit={deleteState.executeDelete}
            isLoading={deleteState.deleting}
          />
        </Box>
      </Flex>
    )
  )
}

const useDeleteVideoFromPlaylist = () => {
  const deleteState = useDeleteRecord<{ playlistId: string; videoId: string }>(
    deleteQuery,
  )
  const client = useApolloClient()
  React.useEffect(() => {
    if (deleteState.isDoneDelete) {
      // should be server returns current data and updated based on the data, but I just wanna give it a try...
      const fragmentVideo = client.readFragment<FragmentVideo>({
        id: deleteState.parameters!.videoId,
        fragment: videoFragmentQuery,
      })
      const fragmentPlaylist = client.readFragment<FragmentPlaylist>({
        id: deleteState.parameters!.playlistId,
        fragment: playlistFragmentQuery,
      })
      console.log("fragmentPlaylist", fragmentPlaylist)

      client.writeFragment<FragmentPlaylist>({
        id: deleteState.parameters!.playlistId,
        fragment: playlistFragmentQuery,
        data: {
          totalSec:
            fragmentPlaylist!.totalSec - (fragmentVideo!.end - fragmentVideo!.start),
          numOfVideos: fragmentPlaylist!.numOfVideos - 1,
          __typename: "Playlist",
        },
      })

      const data = client.readQuery<QueryPlaylist<GQLPlaylist>>({
        query,
        variables: { id: deleteState.parameters!.playlistId },
      })
      const newVideoData = data
        ? data.playlist.videos.filter(
            (video) => video.id !== deleteState.parameters?.videoId,
          )
        : []

      client.writeQuery<QueryPlaylist<GQLPlaylist>>({
        query,
        data: { playlist: { ...data!.playlist, videos: newVideoData } },
      })
      deleteState.resetParameter()
    }
  }, [deleteState.isDoneDelete])

  return {
    ...deleteState,
  }
}

const playlistFragmentQuery = gql`
  fragment CurrentPlaylist on Playlist {
    totalSec
    numOfVideos
  }
`
type FragmentPlaylist = Pick<GQLDefPlaylist, "totalSec" | "numOfVideos"> & {
  __typename: "Playlist"
}

const videoFragmentQuery = gql`
  fragment Video on PartialVideo {
    id
    start
    end
  }
`
type FragmentVideo = Pick<GQLDefVideo, "id" | "start" | "end">

const deleteQuery = gql`
  mutation DeleteVideoFromPlaylist($playlistId: ID!, $videoId: ID!) {
    deleteVideoFromPlaylist(playlistId: $playlistId, videoId: $videoId)
  }
`

export const query = gql`
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
export type GQLPlaylist = Pick<
  GQLDefPlaylist,
  "id" | "name" | "comment" | "numOfVideos" | "totalSec"
> & { videos: ReadonlyArray<GQLVideo> }
