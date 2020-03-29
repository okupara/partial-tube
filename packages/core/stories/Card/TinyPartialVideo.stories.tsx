import React from "react"
import { TinyPartialVideoCard } from "../../src/components/Card/TinyPartialVideoCard"
import { MarginDecorator } from "../Decorators"
import { partialVideList } from "../../__mocks__/ParitalVideoList"

export const tinyPartialVideoCard = () => (
  <TinyPartialVideoCard {...partialVideList[0]} />
)

export default {
  title: "Card",
  decorators: [MarginDecorator],
}
