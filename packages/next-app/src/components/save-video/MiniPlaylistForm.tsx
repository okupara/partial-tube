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
  Collapse,
} from "@chakra-ui/core"
import gql from "graphql-tag"
import { useIsOpen } from "../../hooks/useIsOpen"
import { useMutation } from "@apollo/react-hooks"
import { useUpdatePlaylists } from "./hooks/useQueryPlaylists"
import { useDispatchSelectedPlaylists } from "./hooks/LocalSelectedPlaylists"

export const Component = () => {
  const res = useMiniNewPlaylist()
  const openState = useIsOpen()
  return (
    <Flex flexDirection="column" width="100%">
      <Box>
        <Heading as="h4" fontSize="md" onClick={openState.toggle} cursor="pointer">
          Create new playlist
        </Heading>
      </Box>
      <Collapse isOpen={openState.isOpen}>
        <Box mt={2}>
          <FormControl>
            <FormLabel fontSize="sm">Name</FormLabel>
            <Input
              size="sm"
              value={res.name}
              onChange={res.onChangeText}
              placeholder="Name"
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel fontSize="sm">Privacy</FormLabel>
            <Select
              value={res.permission}
              onChange={res.onChangePermission}
              size="sm"
            >
              <option value="private">private</option>
              <option value="public">public</option>
            </Select>
          </FormControl>
        </Box>
        <Box textAlign="right" mt={6}>
          <Button onClick={res.createOnClickAddPlaylist}>create</Button>
        </Box>
      </Collapse>
    </Flex>
  )
}

export const MiniPlaylistForm = React.memo(Component)

const DEFAULT_PERMISSION: Permission = "private"

type MutationData = {
  addPlaylist: GQLPlaylist
}

const useMiniNewPlaylist = () => {
  const [name, setName] = React.useState("")
  const [permission, setPermission] = React.useState<Permission>(DEFAULT_PERMISSION)
  const [executeAdd] = useMutation<MutationData>(addQuery)
  const mutateCallback = useUpdatePlaylists()
  const dispatch = useDispatchSelectedPlaylists()

  const onChangePermission = React.useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      setPermission(ev.target.value as Permission)
    },
    [permission],
  )
  const onChangeText = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setName(ev.target.value)
    },
    [name],
  )

  const createOnClickAddPlaylist = () => {
    executeAdd({
      variables: { playlist: { name, permission } },
      update: (_, res) => {
        if (res.data) {
          mutateCallback(res.data.addPlaylist)
          dispatch.add({ newPlaylist: res.data.addPlaylist })
        }
      },
    })
  }

  return {
    name,
    permission,
    onChangePermission,
    onChangeText,
    createOnClickAddPlaylist,
  }
}

export const addQuery = gql`
  mutation AddPlaylist($playlist: PlaylistInput!) {
    addPlaylist(playlist: $playlist) {
      id
      name
      permission
    }
  }
`
