import React from "react"
import { AppProps } from "next/app"
import { CoreStyleProvider } from "../contexts/CoreStyleProvider"

const App = ({ Component, pageProps }: AppProps) => (
  <CoreStyleProvider>
    <Component {...pageProps} />
  </CoreStyleProvider>
)

export default App
