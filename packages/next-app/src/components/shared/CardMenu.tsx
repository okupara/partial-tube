import * as React from "react"
import { Menu, MenuButton, MenuList } from "@chakra-ui/core"
import { RoundButton } from "./icons/RoundButton"

export const CardMenu: React.FC<{}> = ({ children }) => (
  <Menu closeOnBlur>
    <MenuButton>
      <RoundButton />
    </MenuButton>
    <MenuList minWidth="120px" placement="bottom-end">
      {children}
    </MenuList>
  </Menu>
)
