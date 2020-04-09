import React from "react"
import { Checkbox, Flex, Box, Icon } from "@chakra-ui/core"

export type Permission = "public" | "private"

export type Props = {
  name: string
  permission: Permission
}

export const PlaylistOption = ({ name, permission }: Props) => (
  <Flex alignItems="center">
    <Box>
      <Checkbox defaultIsChecked>{name}</Checkbox>
    </Box>
    <Box ml="auto" lineHeight={1.2}>
      <Icon name={permission === "public" ? "lock" : "view"} />
    </Box>
  </Flex>
)
