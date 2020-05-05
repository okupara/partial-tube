import React from "react"
import AppHeader from "./AppHeader"
import { Button } from "@chakra-ui/core"

type Props = {
  children?: React.ReactNode
  login?: () => void
}

export const UnAuthenticated: React.FC<Props> = (props) => (
  <React.Fragment>
    <AppHeader
      component={
        <Button onClick={props.login} variant="ghost">
          Sign In
        </Button>
      }
    />
    {props.children}
  </React.Fragment>
)
