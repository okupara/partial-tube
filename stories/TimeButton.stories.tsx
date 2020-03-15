import React from "react"
import { MarginDecorator } from "./Decorators"
import TimeButton from "../src/app/components/molecules/TimeButton"
import { Stack, Box } from "@chakra-ui/core"

export const timeButton = () => (
  <Stack spacing={8} direction="row">
    <Box>
      <TimeButton sec={20} />
    </Box>
    <Box>
      <TimeButton sec={140} />
    </Box>
    <Box>
      <TimeButton sec={800} />
    </Box>
    <Box>
      <TimeButton sec={3700} />
    </Box>
  </Stack>
)

export default {
  title: "Button",
  decorators: [MarginDecorator],
}
