import React from "react"
import { AddPartialVideos } from "../src/layouts/AddPartialVideos"
import { UserDcorator } from "./Decorators"

export const addPartialVideo = () => <AddPartialVideos videoId="mQSbaGNzNzc" />

export default {
  title: "Layouts",
  decorators: [UserDcorator],
}
