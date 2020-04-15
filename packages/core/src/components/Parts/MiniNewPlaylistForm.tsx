import React from "react"
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/core"

type Props = {
  onClickAddPlaylist: (text: string, permission: Permission) => void
}

export const MiniNewPlaylistForm = ({ onClickAddPlaylist }: Props) => {
  const res = useMiniNewPlaylist(onClickAddPlaylist)
  return (
    <Flex flexDirection="column" width="100%">
      <Box>
        <Heading as="h4" fontSize="md">
          Create new playlist
        </Heading>
      </Box>
      <Box mt={2}>
        <FormControl>
          <FormLabel fontSize="sm">Name</FormLabel>
          <Input
            size="sm"
            value={res.text}
            onChange={res.onChangeText}
            placeholder="Name"
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel fontSize="sm">Privacy</FormLabel>
          <Select value={res.permission} onChange={res.onChangePermission} size="sm">
            <option value="private">private</option>
            <option value="public">public</option>
          </Select>
        </FormControl>
      </Box>
      <Box textAlign="right" mt={6}>
        <Button onClick={res.createOnClickAddPlaylist}>create</Button>
      </Box>
    </Flex>
  )
}

const useMiniNewPlaylist = (onClickAddPlaylistFn: Props["onClickAddPlaylist"]) => {
  const [text, setText] = React.useState("")
  const [permission, setPermission] = React.useState<Permission>("private")
  const onChangePermission = React.useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      setPermission(ev.target.value as Permission)
    },
    [permission],
  )
  const onChangeText = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setText(ev.target.value)
    },
    [text],
  )

  return {
    text,
    permission,
    onChangePermission,
    onChangeText,
    createOnClickAddPlaylist: () => {
      onClickAddPlaylistFn?.(text, permission)
    },
  }
}
