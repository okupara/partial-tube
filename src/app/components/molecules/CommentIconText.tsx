import React from "react"
import { Text, Icon, BoxProps } from "@chakra-ui/core"

type Props = {
  text?: string
  fontSize?: BoxProps["fontSize"]
}

const CommentIcon = () => <Icon mr={1} name="chat" />

export const CommentIconText: React.FC<Props> = props => {
  const fontSize = props.fontSize ? props.fontSize : "md"
  return props.text ? (
    <Text fontSize={fontSize}>
      <CommentIcon />
      {props.text}
    </Text>
  ) : (
    <Text color="gray.500" fontSize={fontSize} as="i">
      No Comment...
    </Text>
  )
}
