import React from "react"
import { UserDecorator } from "./Decorators"
import { ApolloMockDecorator } from "./ApolloHelper"
import { Videos } from "../src/layouts/Videos"

export const videos = () => <Videos />

export default {
  title: "Layouts",
  decorators: [UserDecorator, ApolloMockDecorator],
}
