import React from "react"
import { AppProps } from "next/app"
import { LoginUserProvider, initLoginUser } from "../context/LoginUser"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <CSSReset />
    <LoginUserProvider value={initLoginUser()}>
      <Component {...pageProps} />
    </LoginUserProvider>
  </ThemeProvider>
)

export default App
