import React from "react"
import { Text, Icon } from "@chakra-ui/core"

type Props = {
  text?: string
}

const CommentIcon = () => <Icon mr={1} name="chat" />

export const CommentIconText: React.FC<Props> = props =>
  props.text ? (
    <Text>
      <CommentIcon />
      {props.text}
    </Text>
  ) : (
    <Text color="gray.500">No Comment...</Text>
  )

export default CommentIconText
