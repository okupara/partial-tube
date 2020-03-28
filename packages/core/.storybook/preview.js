import React from "react"
import { addDecorator } from "@storybook/react"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

addDecorator((storyFn) => (
  <ThemeProvider>
    <CSSReset />
    {storyFn()}
  </ThemeProvider>
))
