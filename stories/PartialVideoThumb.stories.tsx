import React from "react"
import { Margin } from "./MarginDecorator"
import PartialVideoThumb from "../src/app/components/molecules/PartialVideoThumb"
import { partialVideList } from "../mocks/ParitalVideoList"

const mock = partialVideList[0]

export const small = () => (
  <PartialVideoThumb
    timeFontSize="sm"
    imageWidth={140}
    videoId={mock.videoId}
    start={mock.start}
    end={mock.end}
  />
)

export const smallWithHour = () => (
  <PartialVideoThumb
    timeFontSize="sm"
    imageWidth={140}
    videoId="g0avWKtqZng"
    start={3600}
    end={3605}
  />
)

export default {
  title: "PartialVideoThumb",
  decorators: [Margin],
}
