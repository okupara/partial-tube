import * as React from "react"
import { Videos } from "../../src/layouts/Videos"
import { Authenticated } from "../../src/components/auth/Authenticated"
import { partialVideoListMock } from "../../__mocks__/ParitalVideoList"
const user = { id: "hhohoh", name: "hohoho", avatarUrl: "" }

export const videos = () => (
  <Authenticated user={user}>
    <Videos videos={partialVideoListMock} />
  </Authenticated>
)
export default {
  title: "vidoes",
}
