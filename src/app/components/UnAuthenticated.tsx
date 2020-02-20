import React from "react"
import AppHeader from "./organisms/AppHeader"
import LoginButton from "./molecules/LoginButton"

type Props = {
  children?: React.ReactNode
}

const UnAuthenticated: React.FC<Props> = props => (
  <AppHeader component={<LoginButton />}>{props.children}</AppHeader>
)

export default UnAuthenticated
