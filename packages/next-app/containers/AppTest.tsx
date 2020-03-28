import React from "react"
import { UnAuthenticated } from "@partial-tube/core/lib/components/UnAuthenticated"
import { ThemeProvider } from "@partial-tube/core/lib/context/ThemeProvider"

export const AppTest = () => (
  <ThemeProvider>
    <UnAuthenticated>test</UnAuthenticated>
  </ThemeProvider>
)
