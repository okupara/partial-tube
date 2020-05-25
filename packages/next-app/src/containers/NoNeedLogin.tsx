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

export const NoNeedLogin: React.FC<Props> = ({ fbAuth, children, currentMenu }) => {
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
        onClickAdd={moveToAdd}
        logout={fbAuth.logout}
      >
        {children}
      </Authenticated>
    )
  }
  return <InitializingApp />
}
