import React from "react"
import { Flex, Heading } from "@chakra-ui/core"

type Props = {
  component?: React.ReactNode
}

export const AppHeader: React.FC<Props> = (props) => (
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
    zIndex={2}
    // boxShadow="0 1px 0 0 rgba(66,118,146,.1), 0 2px 6px 0 rgba(66,118,146,.1)"
  >
    <Flex justifyContent="center" alignItems="center">
      <Heading size="md" as="h1">
        PartialTube
      </Heading>
    </Flex>
    <Flex
      justifyContent="center"
      alignItems="center"
      lineHeight="16"
      direction="row"
    >
      {props.component ? props.component : null}
    </Flex>
  </Flex>
)

export default AppHeader
