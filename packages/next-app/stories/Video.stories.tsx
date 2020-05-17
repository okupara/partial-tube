import React from "react"
import { AddVideo } from "../src/layouts/AddVideo"
import { EditVideo } from "../src/layouts/EditVideo"
import { UserDecorator } from "./Decorators"
import { ApolloMockDecorator } from "./ApolloHelper"
import { Authenticated } from "../src/components/Authenticated"
import { Videos } from "../src/layouts/Videos"
import { partialVideoListMock } from "../__mocks__/ParitalVideoList"

const user = { id: "hhohoh", name: "hohoho", avatarUrl: "" }

export const addPartialVideo = () => (
  <Authenticated user={user}>
    <AddVideo />
  </Authenticated>
)

const dummyVideo = partialVideoListMock[0]
export const editVideo = () => (
  <Authenticated user={user}>
    <EditVideo
      id="test2222"
      video={{
        id: dummyVideo.id,
        videoId: dummyVideo.videoId,
        title: dummyVideo.title,
        start: dummyVideo.start,
        end: dummyVideo.end,
        comment: dummyVideo.comment,
        playlists: [],
      }}
    />
  </Authenticated>
)

export const videos = () => (
  <Authenticated user={user}>
    <Videos videos={partialVideoListMock} />
  </Authenticated>
)

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
