import React from "react"
import { Text, BoxProps } from "@chakra-ui/core"

type Props = {
  count: number
  fontSize?: BoxProps["fontSize"]
  fontWeight?: BoxProps["fontWeight"]
}

const determineContent = (count: number) => {
  if (count === 0) {
    return "No items"
  } else if (count === 1) {
    return `${count} item`
  }
  return `${count} items`
}

export const ItemCountText = ({ count, ...props }: Props) => (
  <Text {...props}>{determineContent(count)}</Text>
)
