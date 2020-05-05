import * as React from "react"
import { MarginDecorator, UserDecorator } from "./Decorators"
import { ApolloMockDecorator } from "./ApolloHelper"
import { InputVideoUrlContainer } from "../src/containers/InputVideoUrlContainer"

export const inputVideoUrlContainer = () => <InputVideoUrlContainer />
inputVideoUrlContainer.story = {
  name: "InputVideoUrlContainer",
}

export default {
  title: "Containers",
  decorators: [MarginDecorator, UserDecorator, ApolloMockDecorator],
}
