import React from "react"
import { MarginDecorator } from "./Decorators"
import { SetTimeButton } from "../src/app/components/molecules/SetTimeButton"
import { Stack, Box } from "@chakra-ui/core"

export const setTimeButton = () => (
  <Stack spacing={8} direction="row">
    <Box>
      <SetTimeButton sec={10} />
    </Box>
    <Box>
      <SetTimeButton sec={3800} />
    </Box>
  </Stack>
)

export default {
  title: "Button",
  decorators: [MarginDecorator],
}
