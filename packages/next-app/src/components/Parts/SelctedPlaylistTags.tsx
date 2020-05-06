import React from "react"
import { Stack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/core"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useNormalizedData, map } from "../../utils/DataNormalizer"

const query = gql`
  query {
    selectedPlaylists @client {
      id
      name
      permission
    }
  }
`
type QueryData = SelectedPlaylists<GQLPlaylist>

export const Component = () => {
  const { normalizedData } = useSelectedPlaylists()
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
              <TagCloseButton onClick={() => {}} />
            </Tag>
          )
        })}
    </Stack>
  )
}

export const useSelectedPlaylists = () => {
  const { data, loading, error } = useQuery<QueryData>(query)
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

export const SelectedPlaylistTags = React.memo(Component)
