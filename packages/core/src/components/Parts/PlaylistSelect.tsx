import React from "react"
import { Flex, Box, Stack } from "@chakra-ui/core"
// import { PlaylistOption, Props as OptionProps } from "./PlaylistOption"

// export type Props = {
//   optionsView: () => React.ReactNode[]
// }

export const PlaylistSelect: React.FC<{}> = ({ children }) => {
  // const inputRef = React.useRef<HTMLInputElement | null>(null)
  return (
    <Flex flexDirection="column">
      <Box>
        <Stack spacing={2}>{children}</Stack>
      </Box>
    </Flex>
  )
}
