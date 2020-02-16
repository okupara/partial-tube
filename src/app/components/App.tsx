import React from "react"
import Header from "./Header"

type AppProps = {
  children?: React.ReactNode
}

const App: React.FC<AppProps> = props => (
  <main>
    <Header />
    {props.children}
  </main>
)

export default App
