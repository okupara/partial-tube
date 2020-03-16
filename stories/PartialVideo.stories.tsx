import React from "react"
import { PartialVideoCardList } from "../src/app/components/molecules/PartialVideoCardList"
import { PartialVideoCard } from "../src/app/components/molecules/PartialVideoCard"
import { MarginDecorator } from "./Decorators"
import { partialVideList, longList } from "../mocks/ParitalVideoList"
import { TinyPartialVideoCard } from "../src/app/components/molecules/TinyPartialVideoCard"
import { TinyPartialVideoCardList } from "../src/app/components/molecules/TinyPartialVideoCardList"

export const partialVideoCard = () => <PartialVideoCard {...partialVideList[0]} />
export const videoCardList = () => (
  <PartialVideoCardList partialVideoList={partialVideList} />
)
export const tinyPartialVideoCard = () => (
  <TinyPartialVideoCard
    videoId={partialVideList[0].videoId}
    start={20}
    end={28}
    comment={partialVideList[0].comment}
  />
)
export const tinyPartilaVideoCardList = () => (
  <TinyPartialVideoCardList partialVideoList={longList} />
)

export default {
  title: "PartialVideo",
  decorators: [MarginDecorator],
}
