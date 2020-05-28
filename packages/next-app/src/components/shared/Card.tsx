import React from "react"
import { Box } from "@chakra-ui/core"

export type MenuProps = {
  label: React.ReactNode
  onSelect: () => void
}

type Props = {
  mb?: number
  onClick?: () => void
}

export const Card: React.FC<Props> = (props) => (
  <Box
    position="relative"
    p={5}
    mb={props.mb}
    cursor="pointer"
    shadow="sm"
    borderWidth="1px"
    borderRadius={4}
    onClick={(e) => {
      e.stopPropagation()
      props.onClick?.()
    }}
  >
    {props.children}
  </Box>
)
