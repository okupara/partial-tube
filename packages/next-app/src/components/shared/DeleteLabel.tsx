import * as React from "react"
import { Flex, Icon, Text } from "@chakra-ui/core"

export const DeleteLabel = () => (
  <Flex alignItems="center">
    <Icon name="delete" />
    <Text ml={1}>delete</Text>
  </Flex>
)
