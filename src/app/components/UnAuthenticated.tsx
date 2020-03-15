import React from "react"
import AppHeader from "./organisms/AppHeader"
import { Button } from "@chakra-ui/core"

type Props = {
  children?: React.ReactNode
}

export const UnAuthenticated: React.FC<Props> = props => (
  <AppHeader component={<Button variant="ghost">Sign In</Button>}>
    {props.children}
  </AppHeader>
)
