import React from "react"
import { UserDecorator } from "./Decorators"
import { Playlist } from "../src/layouts/Playlist"
import { ApolloMockDecorator } from "./ApolloHelper"
import { Authenticated } from "../src/components/Authenticated"

export const playlist = () => (
  <Authenticated user={{ id: "hoho", name: "hohoho", avatarUrl: "" }}>
    <Playlist playlistId="test111" />
  </Authenticated>
)

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
