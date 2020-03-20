import React from "react"
import { Flex, Box, Button, Textarea } from "@chakra-ui/core"
import { VideoTimeField } from "./VideoTimeField"

type Props = {
  currentTime: number
  onAdd?: () => void
}

type NullableNumber = null | number

const useFormState = () => {
  const [start, setStart] = React.useState<NullableNumber>(null)
  const [end, setEnd] = React.useState<NullableNumber>(null)
  const [comment, setComment] = React.useState("")
  return {
    start,
    end,
    comment,
    setStart: (start: number) => setStart(start),
    setEnd: (end: number) => setEnd(end),
    setComment: React.useCallback(
      (e: React.FormEvent<HTMLInputElement>) => setComment(e.currentTarget.value),
      [],
    ),
  }
}

export const AddPartialVideoForm = ({ onAdd, currentTime }: Props) => {
  const state = useFormState()
  console.log(state)
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        <Box>
          <VideoTimeField
            title="start"
            currentTime={currentTime}
            selectedSec={state.start}
            onTimeSet={() => state.setStart(currentTime)}
          />
        </Box>
        <Box ml={4}>
          <VideoTimeField
            title="end"
            currentTime={currentTime}
            selectedSec={state.end}
            onTimeSet={() => state.setEnd(currentTime)}
          />
        </Box>
        <Box ml="auto">
          <Button>PREVIEW</Button>
        </Box>
      </Flex>
      <Box mt={5}>
        <Textarea
          value={state.comment}
          onChange={state.setComment}
          height={10}
          placeholder="put some comments..."
        />
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Button onClick={onAdd}>ADD</Button>
      </Flex>
    </Flex>
  )
}
