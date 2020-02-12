import React from "react"
import Header from './Header'

const App = ({ children }: { children?: any }) => (
  <main>
    <Header />
    {children}
  </main>
)

export default App
