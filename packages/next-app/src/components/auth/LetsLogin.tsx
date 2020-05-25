import React from "react"
import { Box, Flex, Text, Button } from "@chakra-ui/core"

type Props = {
  login?: () => void
}

export const Component = (props: Props) => (
  <Flex flexDirection="column" justifyContent="center" alignItems="center">
    <Box ml={4}>
      <Text fontSize="lg" fontWeight="bold">
        You need to login to access this page.
      </Text>
    </Box>
    <Box mt={10}>
      <Button onClick={props.login}>Login with Google</Button>
    </Box>
  </Flex>
)

export const LetsLogin = React.memo(Component)
