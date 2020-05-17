import React from "react"
import { Box, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/core"
import { RoundButton } from "../Icons/RoundButton"

export type MenuProps = {
  label: React.ReactNode
  onSelect: () => void
}

type Props = {
  mb?: number
  onClick?: () => void
  menus?: ReadonlyArray<MenuProps>
}

export const Card: React.FC<Props> = (props) => (
  <Box
    position="relative"
    p={5}
    mb={props.mb}
    cursor="pointer"
    shadow="sm"
    borderWidth="1px"
    borderRadius={4}
    onClick={props.onClick}
  >
    {props.menus && (
      <Box position="absolute" top={3} right={3}>
        <Menu closeOnBlur>
          <MenuButton>
            <RoundButton />
          </MenuButton>
          <MenuList minWidth="120px" placement="bottom-end">
            {props.menus.map((item) => (
              <MenuItem onClick={() => item.onSelect()}>{item.label}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    )}

    {props.children}
  </Box>
)
