import * as React from "react"
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/core"

type Props = {
  menus: ReadonlyArray<string>
  current?: string
  onClick?: (val: string) => void
}

const Component = (props: Props) => (
  <ChakraMenu>
    <MenuButton
      as={Button}
      {...{
        rightIcon: "chevron-down", // https://github.com/chakra-ui/chakra-ui/issues/231
      }}
    >
      {props.current ?? "menu"}
    </MenuButton>
    <MenuList>
      {props.menus.map((el, i) => (
        <MenuItem key={i} onClick={() => props.onClick?.(el)}>
          {el}
        </MenuItem>
      ))}
    </MenuList>
  </ChakraMenu>
)

export const FeaturesMenu = React.memo(Component)
