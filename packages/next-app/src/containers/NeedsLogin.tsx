import React from "react"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { NeedLogin } from "../layouts/NeedLogin"
import { InitializingApp } from "../layouts/InitializingApp"
import { Authenticated } from "../components/Authenticated"
import { useLoginUser } from "../contexts/LoginUser"

type Props = {
  fbAuth: HooksReturnType
}

export const NeedsLogin: React.FC<Props> = ({ fbAuth, children }) => {
  const userContext = useLoginUser()
  if (fbAuth.state === "notLoggedIn") {
    return <NeedLogin login={fbAuth.login} />
  }
  if (fbAuth.state === "loggedIn" && userContext.user) {
    return <Authenticated user={userContext.user}>{children}</Authenticated>
  }
  return <InitializingApp />
}
