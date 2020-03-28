import React from "react"
import { MarginDecorator } from "./Decorators"
import { Text } from "@chakra-ui/core"
import { partialVideList, longList } from "../__mocks__/ParitalVideoList"
import { TinyPartialVideoCardList } from "../src/components/molecules/TinyPartialVideoCardList"
import { TinyPartialVideoCard } from "../src/components/molecules/TinyPartialVideoCard"

export const tinyPartialVideoCard = () => (
  <TinyPartialVideoCard
    videoId={partialVideList[0].videoId}
    start={20}
    end={28}
    comment={partialVideList[0].comment}
  />
)

export const tinypartialVideoCardList = () => (
  <TinyPartialVideoCardList
    titleView={() => <Text>example</Text>}
    partialVideoList={longList}
  />
)
export default {
  title: "TinyPartialVideoCard",
  decorators: [MarginDecorator],
}
