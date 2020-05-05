import React from "react"
import { UserDecorator, MarginDecorator } from "../Decorators"
import { PartialVideoForm } from "../../src/components/Form/PartialVideoForm"
import { MockApolloProvider } from "../ApolloHelper"

export const partialVideoForm = () => (
  <MockApolloProvider>
    <PartialVideoForm videoId="rKMSJ3qN93E" title="hogehoge" />
  </MockApolloProvider>
)
partialVideoForm.story = {
  name: "PartialVideoForm",
}

export default {
  title: "Form",
  decorators: [UserDecorator, MarginDecorator],
}
