import React from "react"
import { Button } from "@chakra-ui/core"

type Props = {
  onClick?: () => void
}

const LoginButton: React.FC<Props> = props => (
  <Button variant="ghost" onClick={props.onClick}>
    Sign In
  </Button>
)

export default LoginButton
