import React from "react"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { NeedLogin } from "@partial-tube/core/lib/layouts/NeedLogin"
import { InitializingApp } from "@partial-tube/core/lib/layouts/InitializingApp"
import { Authenticated } from "@partial-tube/core/lib/components/Authenticated"
import { useLoginUser } from "@partial-tube/core/lib/contexts/LoginUser"

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
