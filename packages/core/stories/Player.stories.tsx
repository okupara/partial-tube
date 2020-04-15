import React from "react"
import { UserDecorator } from "./Decorators"
import { Player } from "../src/layouts/PartialVideoPlayer"
import { partialVideListMock } from "../__mocks__/ParitalVideoList"

export const player = () => <Player partialVideoList={partialVideListMock} />

export default {
  title: "Layouts",
  decorators: [UserDecorator],
}
