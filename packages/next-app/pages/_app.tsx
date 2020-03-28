import React from "react"
import { AppProps } from "next/app"
import { CoreStyleProvider } from "@partial-tube/core/lib/context/CoreStyleProvider"

const App = ({ Component, pageProps }: AppProps) => (
  <CoreStyleProvider>
    <Component {...pageProps} />
  </CoreStyleProvider>
)

export default App
