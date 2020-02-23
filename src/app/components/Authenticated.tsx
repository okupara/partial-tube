import React from "react"
import AppHeader from "./organisms/AppHeader"
import UserAvatar from "./molecules/UserAvatar"
import * as User from "../../models/User"

type Props = {
  children: React.ReactNode
  user: User.Model
}

const Aunthenticated: React.FC<Props> = props => (
  <AppHeader component={<UserAvatar name={props.user.name} />}>{props.children}</AppHeader>
)

export default Aunthenticated
