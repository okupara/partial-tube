import React from "react"
import { AddVideo } from "../src/layouts/AddVideo"
import { UserDecorator } from "./Decorators"
import { MockApolloProvider } from "./ApolloHelper"

export const addPartialVideo = () => (
  <MockApolloProvider>
    <AddVideo />
  </MockApolloProvider>
)

export default {
  title: "Layouts",
  decorators: [UserDecorator],
}
