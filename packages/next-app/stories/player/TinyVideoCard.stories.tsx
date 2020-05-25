import * as React from "react"
import { TinyVideoCard } from "../../src/components/player/TinyVideoCard"
import { MarginDecorator } from "../Decorators"

export const tinyVideoCard = () => (
  <TinyVideoCard
    videoId="iaqgyA9PZ08"
    comment="これhテストテスト"
    start={10}
    end={30}
    playing
  />
)

tinyVideoCard.story = {
  name: "TinyVideoCard",
}

export default {
  title: "player|parts/",
  decorators: [MarginDecorator],
}
