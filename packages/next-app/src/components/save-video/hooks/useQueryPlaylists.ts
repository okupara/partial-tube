import { useCallback } from "react"
import gql from "graphql-tag"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import { Playlist } from "../../../graphql/type-defs.graphqls"

export const usePlaylists = () => {
  const res = useQuery<QueryPlaylists<GQLPlaylist>>(queryPlaylists, {
    fetchPolicy: "cache-and-network",
  })
  return res
}

export const useUpdatePlaylists = () => {
  const client = useApolloClient()
  return useCallback((newRecord: GQLPlaylist) => {
    const res = client.readQuery<QueryPlaylists<GQLPlaylist>>({
      query: queryPlaylists,
    })
    if (res) {
      res.playlists
      client.writeQuery<QueryPlaylists<GQLPlaylist>>({
        query: queryPlaylists,
        data: { playlists: [newRecord, ...res.playlists] },
      })
    }
  }, [])
}

const queryPlaylists = gql`
  query {
    playlists {
      id
      name
      permission
    }
  }
`

export type GQLPlaylist = Pick<Playlist, "id" | "name" | "permission">
