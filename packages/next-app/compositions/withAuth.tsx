import React from "react"
import { NextComponentType } from "next"
import { useFirebaseAuth } from "../hooks/useFirebaseAuth"
import { useLoginUser } from "@partial-tube/core/lib/contexts/LoginUser"
import { InitializingApp } from "@partial-tube/core/lib/layouts/InitializingApp"
import { NeedLogin } from "@partial-tube/core/lib/layouts/NeedLogin"
import { Authenticated } from "@partial-tube/core/lib/components/Authenticated"

export const withAuth = (PageComponent: NextComponentType) => {
  const withAuthCompo = (pageProps: {}) => {
    const fb = useFirebaseAuth()
    const userContext = useLoginUser()
    console.log(userContext, fb.state)

    React.useEffect(() => {
      if (fb.user) {
        userContext.setUser(fb.user)
      }
    }, [fb.user])

    if (fb.state === "notLoggedIn") {
      return <NeedLogin login={fb.login} />
    }
    if (fb.state === "loggedIn" && userContext.user) {
      return (
        <Authenticated user={userContext.user}>
          <PageComponent {...pageProps} />
        </Authenticated>
      )
    }
    return <InitializingApp />
  }
  return withAuthCompo
}
