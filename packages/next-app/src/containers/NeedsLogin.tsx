import React from "react"
import { useRouter } from "next/router"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { LetsLogin } from "../components/auth/LetsLogin"
import { InitializingApp } from "../layouts/InitializingApp"
import { UnAuthenticated } from "../components/auth/UnAuthenticated"
import { Authenticated } from "../components/auth/Authenticated"
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
  const moveToAdd = () => router.push("/video/add")

  if (fbAuth.state === "notLoggedIn") {
    return (
      <UnAuthenticated
        currentMenu={currentMenu}
        onChangeMenu={moveNextUrl}
        login={fbAuth.login}
      >
        <LetsLogin login={fbAuth.login} />
      </UnAuthenticated>
    )
  }
  if (fbAuth.state === "loggedIn" && userContext.user) {
    return (
      <Authenticated
        currentMenu={currentMenu}
        onChangeMenu={moveNextUrl}
        user={userContext.user}
        onClickAdd={moveToAdd}
        logout={fbAuth.logout}
      >
        {children}
      </Authenticated>
    )
  }
  return <InitializingApp />
}
