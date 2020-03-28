import React from "react"
import { MarginDecorator } from "./Decorators"
import { TimeText } from "../src/components/molecules/TimeText"
import { Stack, Box } from "@chakra-ui/core"
import { TimeRangeText } from "../src/components/molecules/TimeRangeText"

export const timeText = () => (
  <Stack spacing={8} direction="row">
    <Box>
      <TimeText sec={220} />
    </Box>
    <Box>
      <TimeText sec={880} />
    </Box>
    <Box>
      <TimeText sec={3800} />
    </Box>
  </Stack>
)

export const timeRangeText = () => <TimeRangeText start={220} end={330} />

export default {
  title: "TimeText",
  decorators: [MarginDecorator],
}
