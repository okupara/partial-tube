import * as React from "react"
import { PartialVideoCard } from "../../src/components/videos/PartialVideoCard"
import { MarginDecorator } from "../Decorators"
import { partialVideoListMock } from "../../__mocks__/ParitalVideoList"

export const videoCard = () => <PartialVideoCard {...partialVideoListMock[0]} />
videoCard.sotry = {
  name: "videoCard",
}

export default {
  title: "videos|parts/",
  decorators: [MarginDecorator],
}
