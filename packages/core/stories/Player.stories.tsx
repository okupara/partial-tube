import React from "react"
import { partialVideList } from "../__mocks__/ParitalVideoList"
import { PlayerController } from "../src/components/molecules/PlayerController"
import { Player } from "../src/components/organisms/PartialVideoPlayer"

export const playerController = () => <PlayerController />
export const partialVideoListPlayer = () => (
  <Player partialVideoList={partialVideList} />
)

export default {
  title: "Player",
  decorators: [],
}
