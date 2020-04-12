import React from "react"
import { Modal } from "../components/Parts/Modal"
import { PlaylistSelect } from "../components/Parts/PlaylistSelect"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import {
  PlaylistOption,
  DataProps as PlaylistOptionProps,
} from "../components/Parts/PlaylistOption"
import { Box } from "@chakra-ui/core"

export const query = gql`
  query Playlist($uid: String!) {
    playlist(uid: $uid) {
      id
      name
      permission
    }
  }
`
export type GQLPlaylist = {
  id: string
  name: string
  permission: "public" | "private"
}
type GQLPlaylistArray = ReadonlyArray<GQLPlaylist>
type QueryData = {
  playlist: GQLPlaylistArray
}
type NormalizedPlaylists = {
  ids: ReadonlyArray<string>
  body: { [key: string]: PlaylistOptionProps }
}
type Props = {
  uid: string
  selectedPlaylist: GQLPlaylistArray
  onAddToPlaylist?: (p: GQLPlaylist, action: "add" | "delete") => void
}

export const useFetchPlaylist = (uid: string) => {
  const [skip, setSkip] = React.useState(false)
  const { data, loading } = useQuery<QueryData>(query, {
    variables: { uid },
    skip,
  })
  const dataRef = React.useRef<QueryData | undefined>(data)
  React.useEffect(() => {
    if (!loading && !!data) {
      setSkip(true)
      dataRef.current = data
    }
  })
  return {
    data: dataRef.current?.playlist,
  }
}

export const usePlaylistOptions = (
  uid: string,
  selectedOptions: GQLPlaylistArray,
) => {
  const result = useFetchPlaylist(uid)
  const normolizedData = React.useMemo(
    () =>
      result.data ? applyAddedFlag(normalize(result.data), selectedOptions) : null,
    [result.data, selectedOptions],
  )

  return {
    data: normolizedData,
    onChange: (fn: Props["onAddToPlaylist"]) => (id: string, checked: boolean) => {
      if (!normolizedData || !normolizedData.body[id]) {
        return
      }
      fn?.(normolizedData.body[id], checked ? "add" : "delete")
    },
  }
}

const normalize = (gqlData: GQLPlaylistArray): NormalizedPlaylists =>
  gqlData.reduce<NormalizedPlaylists>(
    (previous, current) => {
      return {
        ids: [...previous.ids, current.id],
        body: { ...previous.body, [current.id]: { ...current, added: false } },
      }
    },
    { ids: [], body: {} },
  )

const applyAddedFlag = (
  normalized: NormalizedPlaylists,
  selectedOptions: GQLPlaylistArray,
): NormalizedPlaylists =>
  selectedOptions.reduce((p, c) => {
    return { ...p, body: { ...p.body, [c.id]: { ...p.body[c.id], added: true } } }
  }, normalized)

export const AddPlalystModal = ({
  uid,
  selectedPlaylist,
  onAddToPlaylist,
}: Props) => {
  const { data, onChange } = usePlaylistOptions(uid, selectedPlaylist)

  return (
    <>
      {data ? (
        <Modal
          isOpen
          title="Save to..."
          content={() => (
            <PlaylistSelect
              optionsView={() =>
                data.ids.map((id) => (
                  <Box key={id}>
                    <PlaylistOption
                      onChange={onChange(onAddToPlaylist)}
                      {...data.body[id]}
                    />
                  </Box>
                ))
              }
            />
          )}
        />
      ) : null}
    </>
  )
}
