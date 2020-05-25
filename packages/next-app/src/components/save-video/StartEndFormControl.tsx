import * as React from "react"
import { VideoTimeFormControl } from "./VideoTimeFormControl"
import { Flex, Box, Button } from "@chakra-ui/core"

type Props = {
  currentTime: number
  endTime: number | null
  startTime: number | null
  onSetStartTime: (time: number) => void
  onSetEndTime: (time: number) => void
}

export const Component = ({
  currentTime,
  endTime,
  startTime,
  ...dispatch
}: Props) => {
  return (
    <Flex>
      <Box>
        <VideoTimeFormControl
          title="start"
          currentTime={currentTime}
          selectedSec={startTime}
          onTimeSet={() => dispatch.onSetStartTime(currentTime)}
        />
      </Box>
      <Box ml={4}>
        <VideoTimeFormControl
          title="end"
          currentTime={currentTime}
          selectedSec={endTime}
          onTimeSet={() => dispatch.onSetEndTime(currentTime)}
        />
      </Box>
      <Box ml="auto">
        <Button>PREVIEW</Button>
      </Box>
    </Flex>
  )
}

export const StartEndFormControl = React.memo(Component)
