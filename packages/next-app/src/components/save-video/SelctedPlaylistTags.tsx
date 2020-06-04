import React from "react"
import { Stack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/core"
import { useApolloClient } from "@apollo/react-hooks"
import { DocumentNode } from "graphql"
import { useNormalizedData, map } from "../../utils/DataNormalizer"
import {
  useSelectedPlaylistsQuery,
  useDispatchSelectedPlaylists,
  GQLPlaylist,
} from "./hooks/LocalSelectedPlaylists"

export const Component = () => {
  const { normalizedData } = useSelectedPlaylists()
  const dispatch = useDispatchSelectedPlaylists()

  return (
    <Stack spacing={2} isInline>
      {normalizedData &&
        map(normalizedData, (item) => {
          return (
            <Tag
              size="lg"
              key={item.id}
              rounded="full"
              variant="solid"
              variantColor="blue"
            >
              <TagLabel>{item.name}</TagLabel>
              <TagCloseButton onClick={() => dispatch.delete({ id: item.id })} />
            </Tag>
          )
        })}
    </Stack>
  )
}

export const SelectedPlaylistTags = React.memo(Component)

export const useDeleteSelectedPlaylists = (query: DocumentNode) => {
  const client = useApolloClient()

  return (id: string) => () => {
    const data = client.readQuery<QueryData>({ query })
    if (data) {
      client.writeQuery<QueryData>({
        query,
        data: {
          selectedPlaylists: data.selectedPlaylists.filter((p) => p.id !== id),
        },
      })
    }
  }
}

export const useSelectedPlaylists = () => {
  const { data, loading, error } = useSelectedPlaylistsQuery()
  const { normalizedData, withNormalize } = useNormalizedData<GQLPlaylist>()

  React.useEffect(() => {
    if (data) {
      withNormalize(data.selectedPlaylists)
    }
  }, [data])

  return {
    error,
    loading,
    normalizedData,
  }
}

type QueryData = SelectedPlaylists<GQLPlaylist>
