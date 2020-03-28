import React from "react"
import { PartialVideoCardList } from "../src/components/molecules/PartialVideoCardList"
import { MarginDecorator } from "./Decorators"
import { partialVideList } from "../__mocks__/ParitalVideoList"
import { PartialVideoCard } from "../src/components/molecules/PartialVideoCard"

export const partialVideoCard = () => <PartialVideoCard {...partialVideList[0]} />

export const videoCardList = () => (
  <PartialVideoCardList partialVideoList={partialVideList} />
)

export default {
  title: "PartialVideoList",
  decorators: [MarginDecorator],
}
