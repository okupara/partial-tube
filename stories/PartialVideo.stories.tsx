import React from "react"
import PartialVideoCardList from "../src/app/components/organisms/PartialVideoCardList"
import PartialVideoCard from "../src/app/components/molecules/PartialVideoCard"
import { Margin } from "./MarginDecorator"
import { mocks } from "../mocks/PartialVideo"

export const partialVideoCard = () => <PartialVideoCard {...mocks[0]} />
export const videoCardList = () => <PartialVideoCardList partialVideoList={mocks} />

export default {
  title: "PartialVideo",
  decorators: [Margin],
}
