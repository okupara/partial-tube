import React from "react"
import { AddPartialVideos } from "../src/layouts/AddPartialVideos"
import { UserDecorator } from "./Decorators"
import { MockApolloProvider } from "./ApolloHelper"

export const addPartialVideo = () => (
  <MockApolloProvider>
    <AddPartialVideos videoId="mQSbaGNzNzc" />
  </MockApolloProvider>
)

export default {
  title: "Layouts",
  decorators: [UserDecorator],
}
