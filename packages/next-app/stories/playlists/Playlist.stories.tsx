import React from "react"
import { UserDecorator } from "../Decorators"
import { Playlist, GQLPlaylist } from "../../src/layouts/Playlist"
import { ApolloMockDecorator } from "../ApolloHelper"
import { Authenticated } from "../../src/components/auth/Authenticated"
import { playlistsMock } from "../../__mocks__/PlaylistCollection"

export const playlist = () => (
  <Authenticated user={{ id: "hoho", name: "hohoho", avatarUrl: "" }}>
    <Playlist playlist={playlistsMock[0] as GQLPlaylist} />
  </Authenticated>
)

export default {
  title: "playlists",
  decorators: [UserDecorator, ApolloMockDecorator],
}
