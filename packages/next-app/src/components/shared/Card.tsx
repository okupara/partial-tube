import React from "react"
import { Box } from "@chakra-ui/core"
import { CardMenu } from "./CardMenu"

export type MenuProps = {
  label: React.ReactNode
  onSelect: () => void
}

type Props = {
  mb?: number
  onClick?: () => void
  menus?: ReadonlyArray<MenuProps>
  menuItems?: () => React.ReactNode
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
    onClick={(e) => {
      e.stopPropagation()
      props.onClick?.()
    }}
  >
    {props.menuItems && (
      <Box position="absolute" top={3} right={3}>
        <CardMenu>{props.menuItems()}</CardMenu>
      </Box>
    )}

    {props.children}
  </Box>
)
