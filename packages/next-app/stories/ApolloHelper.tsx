import React from "react"
import { SchemaLink } from "apollo-link-schema"
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools"
import { playlistMock } from "../__mocks__/Playlist"
import { partialVideoListMock } from "../__mocks__/ParitalVideoList"
import { playlistsMock } from "../__mocks__/PlaylistCollection"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import typeDefs from "../src/graphql/type-defs.graphqls"

let sideEffectId = 13333
const mocks = {
  Query: () => ({
    playlist: () => {
      return playlistMock
    },
    playlists: () => {
      return playlistsMock
    },
    videos: () => {
      return partialVideoListMock
    },
    video: () => {
      return partialVideoListMock[0]
    },
  }),
  Mutation: () => ({
    addPlaylist: (_: any, { playlist }: { playlist: GQLPlaylist }) => {
      return { ...playlist, id: sideEffectId++ }
    },
    addVideo: (_: any, { video }: { video: VideoInput }) => {
      return { ...video, id: sideEffectId++ }
    },
    youtubeVideo: () => {
      return {
        id: "ALzF6wiE_hs",
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
