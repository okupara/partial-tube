import React from "react"
import { AppProps } from "next/app"
import { CoreStyleProvider } from "../contexts/CoreStyleProvider"
import { initUser, LoginUserProvider } from "../contexts/LoginUser"

const App = ({ Component, pageProps }: AppProps) => (
  <CoreStyleProvider>
    <LoginUserProvider value={initUser()}>
      <Component {...pageProps} />
    </LoginUserProvider>
  </CoreStyleProvider>
)

export default App
