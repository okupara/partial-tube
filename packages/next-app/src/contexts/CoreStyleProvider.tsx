import React from "react"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

export const CoreStyleProvider: React.FC<{}> = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
)
