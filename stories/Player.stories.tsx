import React from "react"
import { partialVideList } from "../mocks/ParitalVideoList"
import { PlayerController } from "../src/app/components/molecules/PlayerController"
import { Player } from "../src/app/components/organisms/PartialVideoPlayer"

export const playerController = () => <PlayerController />
export const partialVideoListPlayer = () => (
  <Player partialVideoList={partialVideList} />
)

export default {
  title: "Player",
  decorators: [],
}
