import * as React from "react"
import { MarginDecorator } from "../Decorators"
import { partialVideoListMock } from "../../__mocks__/ParitalVideoList"
import { Card } from "../../src/components/shared/Card"
import { VideoItem } from "../../src/components/videos/VideoItem"

export const videoCard = () => (
  <Card>
    <VideoItem {...partialVideoListMock[0]} />
  </Card>
)
videoCard.sotry = {
  name: "videoCard",
}

export default {
  title: "videos|parts/",
  decorators: [MarginDecorator],
}
