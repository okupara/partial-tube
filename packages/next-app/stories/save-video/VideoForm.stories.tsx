import React from "react"
import { UserDecorator, MarginDecorator } from "../Decorators"
import { VideoForm } from "../../src/components/save-video/VideoForm"
import { MockApolloProvider } from "../ApolloHelper"

export const partialVideoForm = () => (
  <MockApolloProvider>
    <VideoForm videoId="rKMSJ3qN93E" title="hogehoge" />
  </MockApolloProvider>
)
partialVideoForm.story = {
  name: "PartialVideoForm",
}

export default {
  title: "save-video|parts/",
  decorators: [UserDecorator, MarginDecorator],
}
