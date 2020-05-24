import React from "react"
import { Box, Stack, Text } from "@chakra-ui/core"
import { Playlist } from "../graphql/type-defs.graphqls"
import { PlaylistCard } from "../components/Card/PlaylistCard"
import gql from "graphql-tag"
import { AlertDeleteDialog } from "../components/shared/AlertDeleteDialog"
import { useDeleteRecord } from "../hooks/useDeleteRecord"
import { useApolloClient } from "@apollo/react-hooks"

type Props = {
  onClickCard?: (id: string) => void
  playlists: ReadonlyArray<GQLPlaylist>
}

export const Playlists = (props: Props) => {
  const deleteState = useDeletePlaylist()
  return (
    <Box px={6}>
      <Stack spacing={4}>
        {props.playlists.map((el) => (
          <Box key={el.id}>
            <PlaylistCard
              onClickCard={props.onClickCard}
              onClickDeleteMenu={deleteState.setId}
              id={el.id}
              name={el.name}
              comment={el.comment}
              updated={el.created}
              firstVideoId={el.firstVideoId}
              numOfVideos={el.numOfVideos}
            />
          </Box>
        ))}
      </Stack>
      <AlertDeleteDialog
        title="Delete video"
        messageView={() => <Text>Do you really want to delete this video?</Text>}
        isOpen={deleteState.readyToDelete}
        onClose={deleteState.resetId}
        onSubmit={deleteState.executeDelete}
        isLoading={deleteState.deleting}
      />
    </Box>
  )
}

const useDeletePlaylist = () => {
  const deleteState = useDeleteRecord(deleteQuery)
  const client = useApolloClient()

  React.useEffect(() => {
    if (deleteState.isDoneDelete) {
      const data = client.readQuery<Playlists<GQLPlaylist>>({ query })
      const newData = data?.playlists.filter((item) => item.id !== deleteState.id)
      client.writeQuery({ query, data: { playlists: newData } })
      deleteState.resetId()
    }
  }, [deleteState.isDoneDelete])
  return {
    ...deleteState,
  }
}

export const deleteQuery = gql`
  mutation DeletePlaylist($id: ID!) {
    deletePlaylist(id: $id)
  }
`

export const query = gql`
  query {
    playlists {
      id
      comment
      numOfVideos
      name
      firstVideoId
      totalSec
      created
    }
  }
`
type GQLPlaylist = Pick<
  Playlist,
  | "id"
  | "comment"
  | "name"
  | "permission"
  | "totalSec"
  | "numOfVideos"
  | "created"
  | "firstVideoId"
>
export type QueryData = Playlists<GQLPlaylist>
