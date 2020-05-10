import React from "react"
import { UserDecorator } from "./Decorators"
import { Player } from "../src/layouts/PartialVideoPlayer"
import { ApolloMockDecorator } from "./ApolloHelper"

export const player = () => <Player playlistId="hohoho" />

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
