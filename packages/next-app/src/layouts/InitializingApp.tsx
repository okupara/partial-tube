import React from "react"
import { AppHeader } from "../components/auth/AppHeader"
import { Box, Spinner, Flex, Text } from "@chakra-ui/core"

// TOOO: Should suspense any seconds until showing this.

export const InitializingApp = () => (
  <>
    <AppHeader />
    <Box mt={40}>
      <Flex justifyContent="center" alignItems="center">
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Box>
        <Box ml={4}>
          <Text fontSize="lg" fontWeight="bold">
            Initializing...
          </Text>
        </Box>
      </Flex>
    </Box>
  </>
)
