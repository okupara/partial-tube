import React from "react"
import { Stack } from "@chakra-ui/core"
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Flex, Box, Checkbox, Icon } from "@chakra-ui/core"
import { useNormalizedData, map as normMap } from "../../utils/DataNormalizer"

export const Component = () => {
  const { items, updateSelectedPlaylists, selectedIds } = usePlaylistsSelector()
  return items ? (
    <Stack spacing={2}>
      {normMap(items, (item) => (
        <Flex key={item.id} alignItems="center">
          <Box>
            <Checkbox
              value={item.id}
              onChange={(e) => {
                updateSelectedPlaylists(item.id, e.currentTarget.checked)
              }}
              isChecked={selectedIds.has(item.id)}
            >
              {item.name}
            </Checkbox>
          </Box>
          <Box ml="auto" lineHeight={1.2}>
            <Icon name={item.permission === "public" ? "view" : "lock"} />
          </Box>
        </Flex>
      ))}
    </Stack>
  ) : null
}
export const PlaylistsSelector = React.memo(Component)

type QueryData = Playlists<GQLPlaylist>
type QueryLocalData = AddedPlaylists<GQLPlaylist>
type QuerySelected = SelectedPlaylists<{ id: string }>

const queryPlaylists = gql`
  query {
    playlists {
      id
      name
      permission
    }
  }
`
const queryAddedPlaylists = gql`
  query {
    addedPlaylists @client {
      id
      name
      permission
    }
  }
`
const querySelectedPlaylists = gql`
  query {
    selectedPlaylists @client {
      id
    }
  }
`
export const useUsersPlaylists = () => {
  const playlistsRes = useQuery<QueryData>(queryPlaylists)
  const newPlaylistsRes = useQuery<QueryLocalData>(queryAddedPlaylists)
  const normalizedState = useNormalizedData<GQLPlaylist>()

  React.useEffect(() => {
    if (playlistsRes.data) {
      const addedPlaylistsLocal = newPlaylistsRes.data
        ? newPlaylistsRes.data.addedPlaylists
        : []
      normalizedState.withNormalize([
        ...addedPlaylistsLocal,
        ...playlistsRes.data.playlists,
      ])
    }
  }, [playlistsRes.data, newPlaylistsRes.data])

  return {
    normalizedData: normalizedState.normalizedData,
    itemsFromIds: normalizedState.itemsFromIds,
  }
}

const usePlaylistsSelector = () => {
  const { normalizedData, itemsFromIds } = useUsersPlaylists()
  const [selectedIds, setSelectedIds] = React.useState<ReadonlyArray<string> | null>(
    null,
  )
  const [execute, selectedPlalystsRes] = useLazyQuery<QuerySelected>(
    querySelectedPlaylists,
  )
  const client = useApolloClient()

  React.useEffect(() => {
    execute()
  }, [])

  React.useEffect(() => {
    if (selectedPlalystsRes.data) {
      const entries = Array.from(
        new Set([
          ...(selectedIds ?? []),
          ...selectedPlalystsRes.data.selectedPlaylists.map((item) => item.id),
        ]),
      )
      setSelectedIds(entries)
    }
  }, [selectedPlalystsRes.data])

  const updateSelectedPlaylists = React.useCallback(
    (id: string, checked: boolean) => {
      const newSelectedIds = checked
        ? [...(selectedIds ?? []), id]
        : [...(selectedIds ?? []).filter((s) => s !== id)]

      setSelectedIds(newSelectedIds)
      client.writeData({
        data: { selectedPlaylists: itemsFromIds(newSelectedIds) },
      })
    },
    [selectedIds, normalizedData],
  )

  return {
    items: normalizedData,
    selectedIds: selectedIds ? new Set(selectedIds) : new Set([]),
    updateSelectedPlaylists,
  }
}
