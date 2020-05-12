import React from "react"
import { Box, IconButton, Flex } from "@chakra-ui/core"
import AppHeader from "./AppHeader"
import { UserAvatar } from "../components/Avatar/UserAvatar"
import * as User from "../models/User"
import { AppTitle } from "../components/Parts/AppTitle"
import { Menu } from "../components/Parts/Menu"
import { MenuType, createOptions, Menus } from "../routes/MenuRouter"

type Props = {
  user: User.Model
  onClickAdd?: () => void
  currentMenu?: MenuType
  onChangeMenu?: (value: string) => void
}

export const Authenticated: React.FC<Props> = ({
  currentMenu,
  children,
  user,
  onClickAdd,
  onChangeMenu,
}) => (
  <React.Fragment>
    <AppHeader>
      <Flex alignItems="center">
        <AppTitle />
        <Box ml={4}>
          <Menu
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
        <UserAvatar name={user.name ?? "*"} />
      </Box>
    </AppHeader>
    <Box pt={24}>{children}</Box>
  </React.Fragment>
)
