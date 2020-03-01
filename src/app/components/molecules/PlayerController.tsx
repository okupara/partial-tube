import React from "react"
import { IconButton, Flex, Box } from "@chakra-ui/core"

export const PlayerController = () => (
  <Flex>
    <Box mr={1}>
      <IconButton icon="triangle-down" aria-label="Prev Video" transform="rotate(90deg)" />
    </Box>
    <Box ml={1}>
      <IconButton icon="triangle-up" aria-label="Next Video" transform="rotate(90deg)" />
    </Box>
  </Flex>
)
