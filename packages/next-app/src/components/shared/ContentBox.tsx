import * as React from "react"
import { Box } from "@chakra-ui/core"

export const ContentBox: React.FC<{}> = ({ children }) => (
  <Box pt={32} pb={16}>
    {children}
  </Box>
)
