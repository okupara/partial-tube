import * as React from "react"
import { TinyPartialVideoCard } from "../../src/components/Card/TinyPartialVideoCard"
import { MarginDecorator } from "../Decorators"

export const tinyPartialVideoCard = () => (
  <TinyPartialVideoCard
    videoId="iaqgyA9PZ08"
    comment="これhテストテスト"
    start={10}
    end={30}
    playing
  />
)

export default {
  title: "Card",
  decorators: [MarginDecorator],
}
