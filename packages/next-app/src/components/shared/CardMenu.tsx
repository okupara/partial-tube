import * as React from "react"
import { Menu, MenuButton, MenuList, Box } from "@chakra-ui/core"
import { RoundButton } from "./icons/RoundButton"

type Props = {
  menuListWidth?: number
}

export const CardMenu: React.FC<Props> = ({ menuListWidth, children }) => (
  <Box position="absolute" top={3} right={3}>
    <Menu closeOnBlur>
      <MenuButton onClick={(e: any) => e.stopPropagation()}>
        <RoundButton />
      </MenuButton>
      <MenuList
        minWidth={menuListWidth ? `${menuListWidth}px` : "170px"}
        placement="bottom-end"
      >
        {children}
      </MenuList>
    </Menu>
  </Box>
)
