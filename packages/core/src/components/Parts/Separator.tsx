import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"

export const Separator = (props: BoxProps) => (
  <Box width="100%" borderColor="gray.200" borderBottomWidth="2px" {...props} />
)
