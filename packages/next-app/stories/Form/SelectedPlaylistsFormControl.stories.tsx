import React from "react"
import { SelectedPlaylistsFormControl } from "../../src/components/Form/SelectedPlaylistsFormControl"
import { MarginDecorator, UserDecorator } from "../Decorators"
import { ApolloMockDecorator } from "../ApolloHelper"

export const selectedPlaylistsFormControl = () => <SelectedPlaylistsFormControl />
selectedPlaylistsFormControl.story = {
  name: "SelectedPlaylistsFormControl",
}

export default {
  title: "Form",
  decorators: [MarginDecorator, ApolloMockDecorator, UserDecorator],
}
