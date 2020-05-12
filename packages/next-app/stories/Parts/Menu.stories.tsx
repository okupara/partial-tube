import * as React from "react"
import { Menu } from "../../src/components/Parts/Menu"
import { MarginDecorator } from "../Decorators"

export const menu = () => (
  <Menu
    current="playlists"
    menus={["videos", "about"]}
    onClick={(val) => console.log(val)}
  />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
