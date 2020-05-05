import React from "react"
import { MarginDecorator } from "../Decorators"
import { DescriptionBox } from "../../src/components/Text/DescriptionBox"
import { Stack, Box, Heading } from "@chakra-ui/core"

const foo = "aaaa\nbarrrrr"
const longSentence = `
hello
bababababa
testsstststststs
あああああああああああああああああ
だあだだあだだだっだd
うううううううううううううううう
momoo
げろげろげろ
`

export const descriptionBox = () => (
  <Stack spacing={8}>
    <Box>
      <Heading as="h3">normal use case</Heading>
      <Box mt={4}>
        <DescriptionBox text={foo} />
      </Box>
    </Box>
    <Box>
      <Heading as="h3">with scrolling</Heading>
      <Box mt={4}>
        <DescriptionBox text={longSentence} maxHeight="100px" />
      </Box>
    </Box>
  </Stack>
)

export default {
  title: "Text",
  decorators: [MarginDecorator],
}
