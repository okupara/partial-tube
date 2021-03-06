import React from "react"
import { Stack } from "@chakra-ui/core"
import {
  Flex,
  Box,
  Checkbox,
  Icon,
  Skeleton as ChakraSkeleton,
} from "@chakra-ui/core"
import { useNormalizedData, map as normMap } from "../../utils/DataNormalizer"
import { usePlaylists, GQLPlaylist } from "./hooks/useQueryPlaylists"
import {
  useSelectedPlaylistsQueryOnce,
  useDispatchSelectedPlaylists,
} from "./hooks/LocalSelectedPlaylists"

const Component = () => {
  const { items, updateSelectedPlaylists, selectedIds } = usePlaylistsSelector()
  return (
    <Skeleton isLoaded={!!items}>
      {items ? (
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
      ) : null}
    </Skeleton>
  )
}

type SkeletonProps = {
  isLoaded: boolean
}
const SKELETON_HEIGHT = 5
const SKELETON_MARGIN = 4
const Skeleton: React.FC<SkeletonProps> = (props) => (
  <div>
    <ChakraSkeleton
      isLoaded={props.isLoaded}
      height={props.isLoaded ? "auto" : SKELETON_HEIGHT}
      my={props.isLoaded ? 0 : SKELETON_MARGIN}
    >
      {props.children}
    </ChakraSkeleton>
    <ChakraSkeleton
      isLoaded={props.isLoaded}
      height={props.isLoaded ? 0 : SKELETON_HEIGHT}
      my={props.isLoaded ? 0 : SKELETON_MARGIN}
    />
    <ChakraSkeleton
      isLoaded={props.isLoaded}
      height={props.isLoaded ? 0 : SKELETON_HEIGHT}
      my={props.isLoaded ? 0 : SKELETON_MARGIN}
    />
  </div>
)

export const PlaylistsSelector = React.memo(Component)

export const useUsersPlaylists = () => {
  const playlistsRes = usePlaylists()
  const normalizedState = useNormalizedData<GQLPlaylist>()

  React.useEffect(() => {
    if (playlistsRes.data) {
      normalizedState.withNormalize(playlistsRes.data.playlists)
    }
  }, [playlistsRes.data])

  return {
    normalizedData: normalizedState.normalizedData,
    itemsFromIds: normalizedState.itemsFromIds,
  }
}

const usePlaylistsSelector = () => {
  const { normalizedData } = useUsersPlaylists()
  const [selectedIds, setSelectedIds] = React.useState<ReadonlyArray<string> | null>(
    null,
  )
  const selectedPlaylistsRes = useSelectedPlaylistsQueryOnce()
  const dispatch = useDispatchSelectedPlaylists()

  React.useEffect(() => {
    if (selectedPlaylistsRes.data) {
      const entries = Array.from(
        new Set([
          ...(selectedIds ?? []),
          ...selectedPlaylistsRes.data.selectedPlaylists.map((item) => item.id),
        ]),
      )
      setSelectedIds(entries)
    }
  }, [selectedPlaylistsRes.data])

  const updateSelectedPlaylists = React.useCallback(
    (id: string, checked: boolean) => {
      if (!normalizedData) return

      if (checked) {
        dispatch.add({
          newPlaylist: normalizedData.items[id],
          updateCallback: (newData) => {
            setSelectedIds(newData.selectedPlaylists.map((item) => item.id))
          },
        })
      } else {
        dispatch.delete({
          id,
          deleteCalback: (newData) => {
            setSelectedIds(newData.selectedPlaylists.map((item) => item.id))
          },
        })
      }
    },
    [selectedIds, normalizedData],
  )

  return {
    items: normalizedData,
    selectedIds: selectedIds ? new Set(selectedIds) : new Set([]),
    updateSelectedPlaylists,
  }
}
