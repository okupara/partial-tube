import React from "react"
import { MarginDecorator } from "./Decorators"
import AddPartialVideos from "../src/app/components/organisms/AddPartialVideos"

export const addPartialVideos = () => <AddPartialVideos videoId="dummy" />

export default {
  title: "PartialVideo",
  decorators: [MarginDecorator],
}
