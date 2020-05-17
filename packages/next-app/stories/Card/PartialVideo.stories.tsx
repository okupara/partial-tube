import React from "react"
import { PartialVideoCard } from "../../src/components/Card/PartialVideoCard"
import { MarginDecorator } from "../Decorators"
import { partialVideoListMock } from "../../__mocks__/ParitalVideoList"

export const partialVideoCard = () => (
  <PartialVideoCard {...partialVideoListMock[0]} />
)

export default {
  title: "Card",
  decorators: [MarginDecorator],
}
