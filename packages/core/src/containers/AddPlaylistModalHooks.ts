import React from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { DataProps as PlaylistOptionProps } from "../components/Parts/PlaylistOption"
export const fetchQuery = gql`
  query Playlist($uid: String!) {
    playlist(uid: $uid) {
      id
      name
      permission
    }
  }
`

export const addQuery = gql`
  mutation AddPlaylist($playlist: PlaylistInput!) {
    addPlaylist(playlist: $playlist) {
      id
      name
      permission
    }
  }
`

export type GQLPaylistInput = Omit<GQLPlaylist, "id">
export type GQLPlaylistArray = ReadonlyArray<GQLPlaylist>
type QueryData = {
  playlist: GQLPlaylistArray
}
type MutationData = {
  addPlaylist: GQLPlaylist
}
export type NormalizedPlaylists = {
  ids: ReadonlyArray<string>
  body: { [key: string]: PlaylistOptionProps }
}
export type UpdatePlaylistFn = (p: GQLPlaylist, action: "add" | "delete") => void

export const useFetchPlaylist = (uid: string) => {
  const [skip, setSkip] = React.useState(false)
  const { data, loading, error } = useQuery<QueryData>(fetchQuery, {
    variables: { uid },
    skip,
  })
  // just reporting for now...
  if (error) {
    console.error("ERROR", error)
  }
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

type UsePlaylistOptionsParam = {
  uid: string
  selectedOptions: GQLPlaylistArray
  updatePlaylistFn: UpdatePlaylistFn
}
export const usePlaylistOptions = (param: UsePlaylistOptionsParam) => {
  const [executeAdd, { data: mutationData }] = useMutation<MutationData>(addQuery)
  const result = useFetchPlaylist(param.uid)
  const [
    normalizedData,
    setNormalizedData,
  ] = React.useState<NormalizedPlaylists | null>(null)

  React.useEffect(() => {
    if (result.data) {
      setNormalizedData(
        applyAddedFlag(normalize(result.data), param.selectedOptions),
      )
    }
  }, [result.data])

  React.useEffect(() => {
    if (normalizedData) {
      setNormalizedData((s) => (s ? applyAddedFlag(s, param.selectedOptions) : null))
    }
  }, [param.selectedOptions])

  React.useEffect(() => {
    if (mutationData && normalizedData) {
      setNormalizedData(withNewPlaylist(mutationData.addPlaylist, normalizedData))
      param.updatePlaylistFn(mutationData.addPlaylist, "add")
    }
  }, [mutationData])

  return {
    data: normalizedData,
    onChange: (id: string, checked: boolean) => {
      if (!normalizedData || !normalizedData.body[id]) {
        return
      }
      param.updatePlaylistFn(normalizedData.body[id], checked ? "add" : "delete")
    },
    onAdd: (name: string, permission: string) => {
      executeAdd({ variables: { playlist: { name, permission } } })
    },
  }
}

const withNewPlaylist = (
  newData: GQLPlaylist,
  normalized: NormalizedPlaylists,
): NormalizedPlaylists => {
  return {
    ids: [newData.id, ...normalized.ids],
    body: { ...normalized.body, [newData.id]: { ...newData, added: true } },
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

const resetAddedFlag = (normalized: NormalizedPlaylists): NormalizedPlaylists =>
  normalized.ids.reduce(
    (p, c) => {
      return {
        ids: [...p.ids, c],
        body: { ...p.body, [c]: { ...normalized.body[c], added: false } },
      }
    },
    {
      ids: [] as ReadonlyArray<string>,
      body: {},
    },
  )

const applyAddedFlag = (
  normalized: NormalizedPlaylists,
  selectedOptions: GQLPlaylistArray,
): NormalizedPlaylists =>
  selectedOptions.reduce((p, c) => {
    return { ...p, body: { ...p.body, [c.id]: { ...p.body[c.id], added: true } } }
  }, resetAddedFlag(normalized))
