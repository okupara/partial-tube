import React from "react"
import { IconButton, Flex, Box } from "@chakra-ui/core"

export const PlayerController = () => (
  <Flex>
    <Box mr={2}>
      <IconButton icon="triangle-down" aria-label="Prev Video" transform="rotate(90deg)" />
    </Box>
    <Box ml={2}>
      <IconButton icon="triangle-up" aria-label="Next Video" transform="rotate(90deg)" />
    </Box>
    <Box ml={4}>
      <IconButton
        variant="ghost"
        icon="repeat-clock"
        aria-label="Prev Video"
        transform="rotate(90deg)"
      />
    </Box>
  </Flex>
)
