import React from "react"
import { PartialVideoCard } from "../../src/components/Card/PartialVideoCard"
import { MarginDecorator } from "../Decorators"
import { partialVideListMock } from "../../__mocks__/ParitalVideoList"

export const partialVideoCard = () => (
  <PartialVideoCard {...partialVideListMock[0]} />
)

export default {
  title: "Card",
  decorators: [MarginDecorator],
}
