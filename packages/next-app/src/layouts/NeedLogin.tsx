import React from "react"
import { AppHeader } from "../components/AppHeader"
import { Box, Flex, Text, Button } from "@chakra-ui/core"

type Props = {
  login?: () => void
}

export const NeedLogin = (props: Props) => (
  <>
    <AppHeader />
    <Box mt={40}>
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
    </Box>
  </>
)
