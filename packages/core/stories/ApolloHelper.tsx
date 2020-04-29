import React from "react"
import { SchemaLink } from "apollo-link-schema"
import { GQLPaylistInput } from "../src/containers/AddPlaylistModalHooks"
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools"
import { playlistOptions } from "../__mocks__/PlaylistOptions"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"

const typeDefs = `
  type Playlist {
    id: ID!
    name: String!
    comment: String
    permission: String!
  }
  input PlaylistInput {
    name: String!
    permission: String!
  }
  type YoutubeVideo {
    id: String!
    title: String!
    description: String
  }
  type Query {
    playlist (uid: String!): [Playlist]!
    youtubeVideo (videoId: String!): YoutubeVideo
  }
  type Mutation {
    addPlaylist (playlist: PlaylistInput): Playlist
  }
`
let sideEffectId = 13333
const mocks = {
  Query: () => ({
    playlist: () => playlistOptions,
  }),
  Mutation: () => ({
    addPlaylist: (_: any, { playlist }: { playlist: GQLPaylistInput }) => {
      return { ...playlist, id: sideEffectId++ }
    },
    youtubeVideo: () => {
      return {
        id: "hohohoho",
        title: "video title",
        description: "video description",
      }
    },
  }),
}

const schema = makeExecutableSchema({
  typeDefs,
})
addMockFunctionsToSchema({
  mocks,
  schema,
})

export const MockApolloProvider: React.FC<{}> = ({ children }) => (
  <ApolloProvider
    client={
      new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({ schema }),
      })
    }
  >
    {children}
  </ApolloProvider>
)

export const ApolloMockDecorator = (styoryfn: () => React.FC<{}>) => (
  <MockApolloProvider>{styoryfn()}</MockApolloProvider>
)
