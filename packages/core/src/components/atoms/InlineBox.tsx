import React from "react"
import { Box } from "@chakra-ui/core"

type Props = {
  children?: React.ReactNode
}
export const InlineBox: React.FC<Props> = (props) => (
  <Box display="inline-block">{props.children}</Box>
)
