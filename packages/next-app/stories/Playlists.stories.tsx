import React from "react"
import { UserDecorator } from "./Decorators"
import { Playlists } from "../src/layouts/Playlists"
import { ApolloMockDecorator } from "./ApolloHelper"
import { Authenticated } from "../src/components/Authenticated"
import { playlistsMock } from "../__mocks__/PlaylistCollection"

export const playlists = () => (
  <Authenticated user={{ id: "hoho", name: "hohoho", avatarUrl: "" }}>
    <Playlists playlists={playlistsMock} onClickCard={(id) => console.log(id)} />
  </Authenticated>
)

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
