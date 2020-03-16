import React from "react"
import { Flex, Box, Button, Textarea } from "@chakra-ui/core"
import { VideoTimeField } from "./VideoTimeField"

type Props = {
  currentTime: number
  onAdd?: () => void
}

export const AddPartialVideoForm = ({ onAdd }: Props) => {
  const [start, setStart] = React.useState<null | number>(null)
  const [end, setEnd] = React.useState<null | number>(null)
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        <Box>
          <VideoTimeField
            title="start"
            currentTime={300}
            selectedSec={start}
            onTimeSet={() => setStart(300)}
          />
        </Box>
        <Box ml={4}>
          <VideoTimeField
            title="end"
            currentTime={300}
            selectedSec={end}
            onTimeSet={() => setEnd(300)}
          />
        </Box>
        <Box ml="auto">
          <Button>PREVIEW</Button>
        </Box>
      </Flex>
      <Box mt={5}>
        <Textarea height={10} placeholder="put some comments..." />
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Button onClick={onAdd}>ADD</Button>
      </Flex>
    </Flex>
  )
}
