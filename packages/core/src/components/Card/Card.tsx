import React from "react"
import { Box } from "@chakra-ui/core"

type Props = {
  mb?: number
  onClick?: () => void
}

export const Card: React.FC<Props> = (props) => (
  <Box
    p={5}
    mb={props.mb}
    cursor="pointer"
    shadow="sm"
    borderWidth="1px"
    borderRadius={4}
    onClick={props.onClick}
  >
    {props.children}
  </Box>
)
