import React from "react"
import { MarginDecorator } from "./Decorators"
import { AddPartialVideos } from "../src/app/components/organisms/AddPartialVideos"
import { AddPartialVideoForm } from "../src/app/components/molecules/AddPartialVideoForm"

export const addPartialForm = () => <AddPartialVideoForm currentTime={180} />
export const addPartialVideos = () => (
  <AddPartialVideos videoId="dummy" addedPartialVideoList={[]} />
)
export default {
  title: "AddPartialVideo",
  decorators: [MarginDecorator],
}
