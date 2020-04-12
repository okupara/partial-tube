import React from "react"
import { AddPlalystModal, GQLPlaylist } from "../src/containers/AddPlaylistModal"
import { SchemaLink } from "apollo-link-schema"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools"
import { playlistOptions, checkedOptions } from "../__mocks__/PlaylistOptions"

const typeDefs = `
  type Playlist {
    id: ID!
    name: String!
    permission: String!
  }
  type Query {
    playlist (uid: String!): [Playlist]!
  }
`

const mocks = {
  Query: () => ({
    playlist: () => playlistOptions,
  }),
}

const schema = makeExecutableSchema({
  typeDefs,
})
addMockFunctionsToSchema({
  mocks,
  schema,
})

export const addPlaylistModal = () => {
  const [state, setState] = React.useState<ReadonlyArray<GQLPlaylist>>(
    checkedOptions as ReadonlyArray<GQLPlaylist>,
  )
  return (
    <ApolloProvider
      client={
        new ApolloClient({
          cache: new InMemoryCache(),
          link: new SchemaLink({ schema }),
        })
      }
    >
      <AddPlalystModal
        uid="akjkjkg"
        selectedPlaylist={state}
        onAddToPlaylist={(p, action) => {
          if (action === "add") {
            setState([...state, p])
          } else {
            setState(state.filter((s) => s.id !== p.id))
          }
        }}
      />
    </ApolloProvider>
  )
}

export default {
  title: "Containers",
}
