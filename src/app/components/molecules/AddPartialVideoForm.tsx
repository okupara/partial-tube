import React from "react"
import { Flex, Text, Box, Button, Icon } from "@chakra-ui/core"
import { secToTime } from "../../ui-domain/Time"

type Props = {
  currentTime: number
}

type Time = null | number

type TimeValueProps = {
  time: Time
}
const TimeValue = ({ time }: TimeValueProps) =>
  time === null ? (
    <Text color="gray.500" as="i">
      Not selected
    </Text>
  ) : (
    <Text>{secToTime(time)}</Text>
  )

export const AddPartialVideoForm = ({ currentTime }: Props) => {
  const [start, setStart] = React.useState<Time>(null)
  const [end, setEnd] = React.useState<Time>(null)
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        <Flex flexDirection="column">
          <Flex flexDirection="row">
            <Text>Start:</Text>
            <Box pl={2}>
              <TimeValue time={start} />
            </Box>
          </Flex>
          <Box>
            <Button onClick={() => setStart(currentTime)}>
              <Icon name="link" />
              01:11
            </Button>
          </Box>
        </Flex>
        <Box mx={4}>
          <Text>-</Text>
        </Box>
        <Flex flexDirection="column">
          <Flex flexDirection="row">
            <Text>Start:</Text>
            <Box pl={2}>
              <TimeValue time={end} />
            </Box>
          </Flex>
          <Box>
            <Button onClick={() => setEnd(currentTime)}>
              <Icon name="link" />
              01:11
            </Button>
          </Box>
        </Flex>

        <Box ml="auto">
          <Button>PREVIEW</Button>
        </Box>
      </Flex>
    </Flex>
  )
}
