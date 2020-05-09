import React from "react"
import { UserDecorator } from "./Decorators"
import { Playlist } from "../src/layouts/Playlist"
import { ApolloMockDecorator } from "./ApolloHelper"

export const playlist = () => <Playlist playlistId="test111" />

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
