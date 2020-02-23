import React from "react"
import PartialVideoCard from "../src/app/components/molecules/PartialVideoCard"
import { Margin } from "./MarginDecorator"
import { mocks } from "../mocks/PartialVideo"

export const partialVideoCard = () => <PartialVideoCard {...mocks[0]} />

export default {
  title: "PartialVideo",
  decorators: [Margin],
}
