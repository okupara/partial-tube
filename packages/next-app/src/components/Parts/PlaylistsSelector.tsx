import React from "react"
import { Stack } from "@chakra-ui/core"
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Flex, Box, Checkbox, Icon } from "@chakra-ui/core"
import { useNormalizedData, map as normMap } from "../../utils/DataNormalizer"

type Props = {
  uid: string
}
export const Component = ({ uid }: Props) => {
  const { items, updateSelectedPlaylists, selectedIds } = usePlaylists(uid)
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
export const PlaylistsSelector = React.memo(Component) as typeof Component

type QueryData = Playlists<GQLPlaylist>
type QueryLocalData = AddedPlaylists<GQLPlaylist>
type QuerySelected = SelectedPlaylists<{ id: string }>

const query = gql`
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

export const usePlaylists = (uid: string) => {
  const res = useQuery<QueryData>(query, { variables: { uid } })
  const resLocal = useQuery<QueryLocalData>(queryAddedPlaylists)
  const [executeSelectedGQL, resSelectedGQL] = useLazyQuery<QuerySelected>(
    querySelectedPlaylists,
  )
  const client = useApolloClient()
  const [selectedIds, setSelectedIds] = React.useState<ReadonlyArray<string> | null>(
    null,
  )
  const { withNormalize, normalizedData, itemsFromIds } = useNormalizedData<
    GQLPlaylist
  >()

  React.useEffect(() => {
    executeSelectedGQL()
  }, [])

  React.useEffect(() => {
    if (resSelectedGQL.data) {
      setSelectedIds(resSelectedGQL.data.selectedPlaylists.map((el) => el.id))
    }
  }, [resSelectedGQL.data])

  React.useEffect(() => {
    if (res.data) {
      console.log("playlists res", res.data)
      const addedPlaylistsLocal = resLocal.data ? resLocal.data.addedPlaylists : []
      withNormalize([...addedPlaylistsLocal, ...res.data.playlists])
    }
  }, [res.data, resLocal.data])

  React.useEffect(() => {
    if (res.error) console.log(res.error)
  }, [res.error])

  const updateSelectedPlaylists = React.useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        setSelectedIds((previous) => (previous ? [...previous, id] : [id]))
      } else {
        setSelectedIds((previous) =>
          previous ? [...previous.filter((s) => s !== id)] : previous,
        )
      }
    },
    [normalizedData],
  )

  React.useEffect(() => {
    if (selectedIds) {
      client.writeData({ data: { selectedPlaylists: itemsFromIds(selectedIds) } })
    }
  }, [selectedIds])

  return {
    items: normalizedData,
    updateSelectedPlaylists,
    selectedIds: React.useMemo(() => new Set(selectedIds), [selectedIds]),
  }
}
