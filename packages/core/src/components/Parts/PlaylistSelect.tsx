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
// import { PlaylistOption, Props as OptionProps } from "./PlaylistOption"
import { Separator } from "./Separator"

export type Props = {
  optionsView: () => React.ReactNode[]
}

export const PlaylistSelect = ({ optionsView }: Props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  return (
    <Flex flexDirection="column">
      <Box>
        <Stack spacing={2}>{optionsView()}</Stack>
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
