import React, { useState } from "react"
import { hot } from "react-hot-loader"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"

const App = () => {
  const [state, setState] = useState(0)
  return (
    <div>
      <CssBaseline />
      <h1>Hello, world</h1>
      <h2>Count: {state}</h2>
      <Button>HELLO</Button>
      <button onClick={() => setState(state + 1)}>+</button>
    </div>
  )
}

export default hot(module)(App)
