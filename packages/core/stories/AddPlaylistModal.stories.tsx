import React from "react"
import { AddPlalystModal } from "../src/containers/AddPlaylistModal"
import { MockApolloProvider } from "./ApolloHelper"
import { checkedOptions } from "../__mocks__/PlaylistOptions"

export const addPlaylistModal = () => {
  const [state, setState] = React.useState<ReadonlyArray<GQLPlaylist>>(
    checkedOptions as ReadonlyArray<GQLPlaylist>,
  )

  return (
    <MockApolloProvider>
      <AddPlalystModal
        uid="akjkjkg"
        isOpen
        onClose={() => {}}
        selectedPlaylist={state}
        updatePlaylistFn={(p, action) => {
          if (action === "add") {
            setState([...state, p])
          } else {
            setState(state.filter((s) => s.id !== p.id))
          }
        }}
      />
    </MockApolloProvider>
  )
}

export default {
  title: "Containers",
}
