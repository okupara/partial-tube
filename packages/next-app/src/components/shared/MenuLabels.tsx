import * as React from "react"
import { Flex, Icon, Text } from "@chakra-ui/core"

type DeleteLabelProps = {
  title?: string
}
export const DeleteLabel = ({ title }: DeleteLabelProps) => (
  <Flex alignItems="center">
    <Icon name="delete" />
    <Text ml={1}>{title ?? "delete"}</Text>
  </Flex>
)

export const EditLabel = () => (
  <Flex alignItems="center">
    <Icon name="edit" />
    <Text ml={1}>edit</Text>
  </Flex>
)
