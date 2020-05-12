import React from "react"
import { useRouter } from "next/router"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { InitializingApp } from "../layouts/InitializingApp"
import { UnAuthenticated } from "../components/UnAuthenticated"
import { Authenticated } from "../components/Authenticated"
import { useLoginUser } from "../contexts/LoginUser"
import { MenuType, determineURL } from "../routes/MenuRouter"

type Props = {
  currentMenu?: MenuType
  fbAuth: HooksReturnType
}

export const NeedsLogin: React.FC<Props> = ({ fbAuth, children, currentMenu }) => {
  const userContext = useLoginUser()
  const router = useRouter()
  const moveNextUrl = (value: string) => router.push(determineURL(value))

  if (fbAuth.state === "notLoggedIn") {
    return (
      <UnAuthenticated
        currentMenu={currentMenu}
        onChangeMenu={moveNextUrl}
        login={fbAuth.login}
      >
        {children}
      </UnAuthenticated>
    )
  }
  if (fbAuth.state === "loggedIn" && userContext.user) {
    return (
      <Authenticated
        currentMenu={currentMenu}
        onChangeMenu={moveNextUrl}
        user={userContext.user}
      >
        {children}
      </Authenticated>
    )
  }
  return <InitializingApp />
}
