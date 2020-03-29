import React from "react"
import { PartialVideoCardList } from "../../src/components/List/PartialVideoCardList"
import { partialVideList } from "../../__mocks__/ParitalVideoList"
import { MarginDecorator } from "../Decorators"

export const partialVideos = () => (
  <PartialVideoCardList partialVideoList={partialVideList} />
)

export default {
  title: "List",
  decorators: [MarginDecorator],
}
