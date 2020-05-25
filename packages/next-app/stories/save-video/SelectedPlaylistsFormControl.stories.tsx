import React from "react"
import { SelectedPlaylistsFormControl } from "../../src/components/save-video/SelectedPlaylistsFormControl"
import { MarginDecorator, UserDecorator } from "../Decorators"
import { ApolloMockDecorator } from "../ApolloHelper"

export const selectedPlaylistsFormControl = () => <SelectedPlaylistsFormControl />
selectedPlaylistsFormControl.story = {
  name: "SelectedPlaylistsFormControl",
}

export default {
  title: "save-video|parts/",
  decorators: [MarginDecorator, ApolloMockDecorator, UserDecorator],
}
