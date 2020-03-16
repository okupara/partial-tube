import React from "react"
import { Text } from "@chakra-ui/core"

type Props = {
  cnt: number
}

const determineContent = (cnt: number) => {
  if (cnt === 0) {
    return "No items"
  } else if (cnt === 1) {
    return `${cnt} item`
  }
  return `${cnt} items`
}

export const ItemCountText: React.FC<Props> = props => (
  <Text>{determineContent(props.cnt)}</Text>
)
