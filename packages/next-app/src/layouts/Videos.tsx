import React from "react"
import { Box, Stack, Text, MenuItem } from "@chakra-ui/core"
import gql from "graphql-tag"
import { PartialVideo as GQLDefVideo } from "../graphql/typ-defs.graphqls"
import { VideoItem } from "../components/videos/VideoItem"
import { AlertDeleteDialog } from "../components/shared/AlertDeleteDialog"
import { useDeleteRecord } from "../hooks/useDeleteRecord"
import { useApolloClient } from "@apollo/react-hooks"
import { Card } from "../components/shared/Card"
import { CardMenu } from "../components/shared/CardMenu"
import { DeleteLabel, EditLabel } from "../components/shared/MenuLabels"

type Props = {
  onClickCard?: (id: string) => void
  onClickEditMenu?: (id: string) => void
  videos: ReadonlyArray<GQLVideo>
}

export const Videos = ({ videos, onClickEditMenu }: Props) => {
  const deleteState = useDeleteVideo()
  return (
    <Box px={6}>
      <Stack spacing={6}>
        {videos.map((v) => (
          <Box key={v.id}>
            <Card>
              <CardMenu>
                <MenuItem onClick={() => onClickEditMenu?.(v.id)}>
                  <EditLabel />
                </MenuItem>
                <MenuItem
                  onClick={() => deleteState.setDeleteParameter({ id: v.id })}
                >
                  <DeleteLabel />
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
  )
}

const useDeleteVideo = () => {
  const deleteState = useDeleteRecord<{ id: string }>(deleteQuery)
  const client = useApolloClient()

  React.useEffect(() => {
    if (deleteState.isDoneDelete) {
      const data = client.readQuery<QueryVideos<GQLVideo>>({ query })
      const newData = data?.videos.filter(
        (item) => item.id !== deleteState.deleteParameter!.id,
      )
      if (newData) {
        client.writeQuery<QueryVideos<GQLVideo>>({
          query,
          data: { videos: newData },
        })
      }
      deleteState.resetParameter()
    }
  }, [deleteState.isDoneDelete])
  return {
    ...deleteState,
  }
}

export const deleteQuery = gql`
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id)
  }
`

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
