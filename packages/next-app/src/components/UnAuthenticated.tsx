import React from "react"
import AppHeader from "./AppHeader"
import { Flex, Box, Button } from "@chakra-ui/core"
import { FeaturesMenu } from "../components/Parts/FeaturesMenu"
import { AppTitle } from "../components/Parts/AppTitle"
import { createOptions, MenuType, NotLoggedInMenus } from "../routes/MenuRouter"

type Props = {
  children?: React.ReactNode
  login?: () => void
  currentMenu?: MenuType
  onChangeMenu?: (value: string) => void
}

export const UnAuthenticated: React.FC<Props> = ({
  currentMenu,
  children,
  login,
  onChangeMenu,
}) => (
  <React.Fragment>
    <AppHeader>
      <Flex alignItems="center">
        <AppTitle />
        <Box ml={4}>
          <FeaturesMenu
            current={currentMenu}
            menus={
              currentMenu ? createOptions(currentMenu, false) : NotLoggedInMenus
            }
            onClick={onChangeMenu}
          />
        </Box>
      </Flex>
      <Box>
        <Button onClick={login} variant="ghost">
          Sign In
        </Button>
      </Box>
    </AppHeader>
    <Box pt={32}>{children}</Box>
  </React.Fragment>
)
