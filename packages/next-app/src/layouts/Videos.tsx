import React from "react"
import { Box, Stack, Text } from "@chakra-ui/core"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { PartialVideo as GQLDefVideo } from "../graphql/typ-defs.graphqls"
import { PartialVideoCard } from "../components/Card/PartialVideoCard"
import { AlertDeleteDialog } from "../components/Parts/AlertDeleteDialog"
import { useIsOpen } from "../hooks/useIsOpen"

type Props = {
  onClickCard?: (id: string) => void
  onClickEditMenu?: (id: string) => void
  onClickDeleteMenu?: (id: string) => void
  videos: ReadonlyArray<GQLVideo>
}

export const Videos = ({ videos, onClickEditMenu }: Props) => {
  const openState = useIsOpen(false)
  const { executeDelete, isDoneDelete, setId, deleteState } = useDeleteVideo()
  React.useEffect(() => {
    if (openState.isOpen && isDoneDelete) {
      openState.close()
    }
  }, [isDoneDelete])

  return (
    <Box px={6}>
      <Stack spacing={6}>
        {videos.map((v) => (
          <Box key={v.id}>
            <PartialVideoCard
              {...v}
              onClickEditMenu={onClickEditMenu}
              onClickDeleteMenu={(id) => {
                openState.open()
                setId(id)
              }}
            />
          </Box>
        ))}
      </Stack>
      <AlertDeleteDialog
        title="Delete video"
        messageView={() => <Text>Do you really want to delete this video?</Text>}
        isOpen={openState.isOpen}
        onClose={openState.close}
        onSubmit={executeDelete}
        isLoading={deleteState.loading}
      />
    </Box>
  )
}

const useDeleteVideo = () => {
  const [executeDelete, deleteState] = useMutation(deleteQuery)
  const [doneDeleteFlag, setDoneDeleteFalg] = React.useState(false)
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (deleteState.data) {
      setDoneDeleteFalg(true)
    } else {
      setDoneDeleteFalg(false)
    }
  }, [deleteState.data])

  return {
    executeDelete() {
      if (id) {
        executeDelete({ variables: { id } })
      }
    },
    deleteState,
    isDoneDelete: doneDeleteFlag === true,
    setId,
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
