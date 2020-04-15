import React from "react"
import { UserDecorator, MarginDecorator } from "../Decorators"
import { AddPartialVideoForm } from "../../src/components/Form/AddPartialVideoForm"
import { MockApolloProvider } from "../ApolloHelper"

export const addPartialVideoForm = () => (
  <MockApolloProvider>
    <AddPartialVideoForm currentTime={200} onAdd={() => {}} />
  </MockApolloProvider>
)

export default {
  title: "Form",
  decorators: [UserDecorator, MarginDecorator],
}
