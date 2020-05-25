import React from "react"
import { IconButton, Flex, Box } from "@chakra-ui/core"

export const PlayerController = () => (
  <Flex justifyContent="space-between">
    <Flex>
      <Box>
        <IconButton
          icon="triangle-down"
          aria-label="Prev Video"
          transform="rotate(90deg)"
        />
      </Box>
      <Box ml={3}>
        <IconButton
          icon="triangle-up"
          aria-label="Next Video"
          transform="rotate(90deg)"
        />
      </Box>
    </Flex>
    <Flex>
      <Box>
        <IconButton variant="ghost" icon="repeat-clock" aria-label="loop" />
      </Box>
      <Box ml={3}>
        <IconButton
          variant="ghost"
          icon="external-link"
          aria-label="external-link"
        />
      </Box>
    </Flex>
  </Flex>
)
