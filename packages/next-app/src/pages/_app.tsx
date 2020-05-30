import React from "react"
import { AppProps } from "next/app"
import { CoreStyleProvider } from "../contexts/CoreStyleProvider"
import { initUser, LoginUserProvider } from "../contexts/LoginUser"
import * as User from "../models/User"

const App = ({ Component, pageProps }: AppProps) => {
  const authUser: User.Model = pageProps.authUser
  return (
    <CoreStyleProvider>
      <LoginUserProvider value={authUser ? initUser(authUser) : initUser()}>
        <Component {...pageProps} />
      </LoginUserProvider>
    </CoreStyleProvider>
  )
}

export default App
