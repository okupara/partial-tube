import React from "react"
import PartialVideoCardList from "../src/app/components/molecules/PartialVideoCardList"
import PartialVideoCard from "../src/app/components/molecules/PartialVideoCard"
import { Margin } from "./MarginDecorator"
import { partialVideList } from "../mocks/ParitalVideoList"

export const partialVideoCard = () => <PartialVideoCard {...partialVideList[0]} />
export const videoCardList = () => <PartialVideoCardList partialVideoList={partialVideList} />

export default {
  title: "PartialVideo",
  decorators: [Margin],
}
