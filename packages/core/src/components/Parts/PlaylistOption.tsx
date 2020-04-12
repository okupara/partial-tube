import React from "react"
import { Checkbox, Flex, Box, Icon } from "@chakra-ui/core"

export type Permission = "public" | "private"

export type DataProps = {
  added: boolean
  id: string
  name: string
  permission: Permission
}
export type UIProps = {
  onChange?: (id: string, checked: boolean) => void
}
type Props = UIProps & DataProps

export const PlaylistOption = ({ id, name, permission, added, onChange }: Props) => (
  <Flex alignItems="center">
    <Box>
      <Checkbox
        value={id}
        onChange={(e) => onChange?.(id, e.target.checked)}
        isChecked={added}
      >
        {name}
      </Checkbox>
    </Box>
    <Box ml="auto" lineHeight={1.2}>
      <Icon name={permission === "public" ? "view" : "lock"} />
    </Box>
  </Flex>
)
