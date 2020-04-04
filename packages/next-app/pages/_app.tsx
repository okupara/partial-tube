import React from "react"
import { AppProps } from "next/app"
import { CoreStyleProvider } from "@partial-tube/core/lib/contexts/CoreStyleProvider"
import {
  LoginUserProvider,
  initUser,
} from "@partial-tube/core/lib/contexts/LoginUser"

const App = ({ Component, pageProps }: AppProps) => (
  <CoreStyleProvider>
    <LoginUserProvider value={initUser()}>
      <Component {...pageProps} />
    </LoginUserProvider>
  </CoreStyleProvider>
)

App.getInitialProps = () => {
  console.log("appp init")
  return {}
}

export default App
