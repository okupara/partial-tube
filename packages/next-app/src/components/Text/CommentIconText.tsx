import React from "react"
import { Text, Icon, BoxProps, Flex, Box } from "@chakra-ui/core"

type Props = {
  text?: string
  fontSize?: BoxProps["fontSize"]
}

export const CommentIconText: React.FC<Props> = (props) => {
  const fontSize = props.fontSize ? props.fontSize : "md"
  return props.text ? (
    <Flex>
      <Box>
        <Icon mr={1} name="chat" />
      </Box>
      <Text
        overflow="hidden"
        whiteSpace="nowrap"
        width="100%"
        style={{ textOverflow: "ellipsis" }}
      >
        {props.text}
      </Text>
    </Flex>
  ) : (
    <Text color="gray.500" fontSize={fontSize} as="i">
      No Comment...
    </Text>
  )
}
