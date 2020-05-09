import React from "react"
import { UserDecorator } from "./Decorators"
import { Playlists } from "../src/layouts/Playlists"

export const playlists = () => <Playlists onClickCard={(id) => console.log(id)} />

export default {
  title: "Layouts",
  decorators: [UserDecorator],
}
