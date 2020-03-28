import React from "react"
import { Box } from "@chakra-ui/core"

export const MarginDecorator = (storyfn: () => React.FC<{}>) => (
  <Box m={4}>{storyfn()}</Box>
)
