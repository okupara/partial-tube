import React from "react"
import {
  Box,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core"
import AppHeader from "./AppHeader"
import { UserAvatar } from "./UserAvatar"
import * as User from "../../models/User"
import { AppTitle } from "./AppTitle"
import { FeaturesMenu } from "./FeaturesMenu"
import { MenuType, createOptions, Menus } from "../../routes/MenuRouter"

type Props = {
  user: User.Model
  onClickAdd?: () => void
  currentMenu?: MenuType
  onChangeMenu?: (value: string) => void
  logout?: () => void
}

export const Authenticated: React.FC<Props> = ({
  currentMenu,
  children,
  user,
  onClickAdd,
  onChangeMenu,
  logout,
}) => (
  <React.Fragment>
    <AppHeader>
      <Flex alignItems="center">
        <AppTitle />
        <Box ml={4}>
          <FeaturesMenu
            current={currentMenu}
            menus={currentMenu ? createOptions(currentMenu, true) : Menus}
            onClick={onChangeMenu}
          />
        </Box>
      </Flex>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        m="auto"
        transform="translate(-50%, -50%)"
      >
        <IconButton
          icon="add"
          aria-label="add"
          borderRadius={24}
          size="lg"
          onClick={onClickAdd}
        />
      </Box>
      <Box>
        <Menu>
          <MenuButton>
            <UserAvatar name={user.name ?? "*"} />
          </MenuButton>
          <MenuList minWidth="120px">
            <MenuItem onClick={logout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </AppHeader>
    <Box pt={32} pb={16}>
      {children}
    </Box>
  </React.Fragment>
)
