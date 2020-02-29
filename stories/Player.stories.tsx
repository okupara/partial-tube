import React from "react"
import { Margin } from "./MarginDecorator"
import Youtube from "../src/app/components/molecules/Youtube"

export const youtube = () => <Youtube videoId="DbLOlBRaQ2s" />

export default {
  title: "Player",
  decorators: [Margin],
}
