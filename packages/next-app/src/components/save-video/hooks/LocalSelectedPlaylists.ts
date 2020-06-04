import { useCallback, useEffect } from "react"
import gql from "graphql-tag"
import { Playlist } from "../../../graphql/type-defs.graphqls"
import { useQuery, useLazyQuery, useApolloClient } from "@apollo/react-hooks"

type QueryResult = SelectedPlaylists<GQLPlaylist>

export const useSelectedPlaylistsQuery = () => {
  return useQuery<QueryResult>(query)
}

export const useSelectedPlaylistsQueryOnce = () => {
  const [execute, res] = useLazyQuery<QueryResult>(query)

  useEffect(() => {
    execute()
  }, [])
  return res
}

type AddParams = {
  newPlaylist: GQLPlaylist
  updateCallback?: (res: QueryResult) => void
}
type DeleteParams = {
  id: string
  deleteCalback?: (res: QueryResult) => void
}

export const useDispatchSelectedPlaylists = () => {
  const client = useApolloClient()

  const add = useCallback((params: AddParams) => {
    const selectedPlaylists = client.readQuery<QueryResult>({
      query,
    })

    const playlists = selectedPlaylists?.selectedPlaylists ?? []
    const newData = { selectedPlaylists: [params.newPlaylist, ...playlists] }

    client.writeQuery<QueryResult>({
      query,
      data: newData,
    })

    params.updateCallback?.(newData)
  }, [])

  const delete_ = useCallback((params: DeleteParams) => {
    const selectedPlaylists = client.readQuery<QueryResult>({
      query,
    })

    const playlists = selectedPlaylists?.selectedPlaylists ?? []
    const newData = {
      selectedPlaylists: playlists.filter((item) => item.id !== params.id),
    }

    client.writeQuery<QueryResult>({
      query,
      data: newData,
    })

    params.deleteCalback?.(newData)
  }, [])

  return { add, delete: delete_ }
}

const query = gql`
  query {
    selectedPlaylists @client {
      id
      name
      permission
    }
  }
`

export type GQLPlaylist = Pick<Playlist, "id" | "name" | "permission">
