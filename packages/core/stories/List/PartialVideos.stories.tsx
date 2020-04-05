import React from "react"
import { PartialVideoCardList } from "../../src/components/List/PartialVideoCardList"
import { partialVideListMock } from "../../__mocks__/ParitalVideoList"
import { MarginDecorator } from "../Decorators"

export const partialVideos = () => (
  <PartialVideoCardList
    onClickCard={(id) => console.log(`${id} clicked`)}
    partialVideoList={partialVideListMock}
  />
)

export default {
  title: "List",
  decorators: [MarginDecorator],
}
