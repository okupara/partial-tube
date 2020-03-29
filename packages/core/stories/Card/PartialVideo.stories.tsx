import React from "react"
import { PartialVideoCard } from "../../src/components/Card/PartialVideoCard"
import { MarginDecorator } from "../Decorators"
import { partialVideList } from "../../__mocks__/ParitalVideoList"

export const partialVideoCard = () => <PartialVideoCard {...partialVideList[0]} />

export default {
  title: "Card",
  decorators: [MarginDecorator],
}
