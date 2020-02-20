import React from "react"
import {
  // initLoginUser,
  useLoginUserContext,
  isLoggedIn,
} from "../context/LoginUser"
import Authenticated from "./Authenticated"
import UnAuthenticated from "./UnAuthenticated"

type Props = {
  children: React.ReactNode
}

export const AuthApp: React.FC<Props> = props => {
  const [loginUser] = useLoginUserContext()
  console.log(loginUser)
  console.log("loginUser: ", loginUser)
  return isLoggedIn(loginUser) ? (
    <Authenticated user={loginUser}>{props.children}</Authenticated>
  ) : (
    <UnAuthenticated />
  )
}

export default AuthApp
