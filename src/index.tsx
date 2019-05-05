import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import DefaultErrorBoundary from "./DefaultErrorBoundary"

ReactDOM.render(
  <DefaultErrorBoundary>
    <App />
  </DefaultErrorBoundary>,
  document.getElementById("root")
)
