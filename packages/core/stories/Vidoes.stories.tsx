import React from "react"
import { UserDcorator } from "./Decorators"
import { Videos } from "../src/layouts/Videos"
import { partialVideListMock } from "../__mocks__/ParitalVideoList"

export const videos = () => <Videos partialVideoList={partialVideListMock} />

export default {
  title: "Layouts",
  decorators: [UserDcorator],
}
