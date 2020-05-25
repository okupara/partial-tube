import React from "react"
import { Flex } from "@chakra-ui/core"

type Props = {
  component?: React.ReactNode
}

export const AppHeader: React.FC<Props> = ({ children }) => (
  <Flex
    as="header"
    height="16"
    px="4"
    py="2"
    borderBottom="1px"
    borderColor="gray.200"
    justify="space-between"
    shadow="sm"
    position="fixed"
    top={0}
    left={0}
    width="100%"
    backgroundColor="white"
    alignItems="center"
    zIndex={2}
    // boxShadow="0 1px 0 0 rgba(66,118,146,.1), 0 2px 6px 0 rgba(66,118,146,.1)"
  >
    {children}
  </Flex>
)

export default AppHeader
