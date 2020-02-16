import React from "react"
import { Flex, Heading } from "@chakra-ui/core"

type Props = {
    component: React.ReactNode
}

const AppHeader = (props: Props) => 
    <Flex height="16" px="4" py="2" borderBottom="1px" borderColor="gray.200" justify="space-between">
        <Flex justifyContent="center" alignItems="center">
            <Heading size="md" as="h1">PartialTube</Heading>
        </Flex>
        <Flex justifyContent="center" alignItems="center" lineHeight="16" direction="row">
            {props.component}
        </Flex>
    </Flex>

export default AppHeader
