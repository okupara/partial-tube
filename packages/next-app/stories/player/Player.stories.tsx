import React from "react"
import { UserDecorator } from "../Decorators"
import { Player, GQLPlaylist } from "../../src/layouts/PartialVideoPlayer"
import { ApolloMockDecorator } from "../ApolloHelper"
import { playlistsMock } from "../../__mocks__/PlaylistCollection"

export const player = () => <Player playlist={playlistsMock[0] as GQLPlaylist} />

export default {
  title: "player",
  decorators: [UserDecorator, ApolloMockDecorator],
}
