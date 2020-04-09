import React from "react"
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Box,
  Select,
  Stack,
  Button,
} from "@chakra-ui/core"
import { PlaylistOption, Props as OptionProps } from "./PlaylistOption"
import { Separator } from "./Separator"
// import gql from "graphql-tag"

// export const query = gql`
//   query Playlist($pid: String!) {
//     playlist(pid: $pid) {
//       id
//       name
//       permission
//     }
//   }
// `
export type Props = {
  playlists: ReadonlyArray<OptionProps>
}

export const PlaylistSelect = ({ playlists }: Props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  return (
    <Flex flexDirection="column">
      <Box>
        <Stack spacing={2}>
          {playlists.map((option, i) => (
            <Box key={i}>
              <PlaylistOption key={i} {...option} />
            </Box>
          ))}
        </Stack>
      </Box>
      <Separator mt={4} />
      <Box mt={4}>
        <Heading as="h4" fontSize="md">
          Create new playlist
        </Heading>
      </Box>
      <Box mt={2}>
        <FormControl>
          <FormLabel fontSize="sm">Name</FormLabel>
          <Input ref={inputRef} size="sm" placeholder="Name" />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel fontSize="sm">Privacy</FormLabel>
          <Select defaultValue="private" size="sm">
            <option value="private">private</option>
            <option value="public">public</option>
          </Select>
        </FormControl>
      </Box>
      <Box textAlign="right" mt={6}>
        <Button>create</Button>
      </Box>
    </Flex>
  )
}
