import * as React from "react"
import { RoundButton } from "../../src/components/shared/icons/RoundButton"
import { Heading, Flex, Box, PseudoBox } from "@chakra-ui/core"
import { MarginDecorator } from "../Decorators"

export const icons = () => (
  <Flex flexDirection="column">
    <Box>
      <Heading as="h2" size="sm">
        RoundButton
      </Heading>
    </Box>
    <Box mt={4}>
      <PseudoBox as="button" onClick={() => console.log("i")}>
        <RoundButton />
      </PseudoBox>
    </Box>
  </Flex>
)

export default {
  title: "Icons",
  decorators: [MarginDecorator],
}
