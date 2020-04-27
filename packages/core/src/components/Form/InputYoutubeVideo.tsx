import * as React from "react"
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/core"

type Props = {
  text: string
  isInvalid?: boolean
  onChange?: (text: string) => void
}

const onChangeHandler = (fn: Props["onChange"]) => (
  e: React.FormEvent<HTMLInputElement>,
) => {
  fn?.(e.currentTarget.value)
}

export const InputYoutubeVideo = ({ text, onChange, isInvalid }: Props) => (
  <FormControl isRequired>
    <FormLabel htmlFor="fname">YouTube URL</FormLabel>
    <Input
      isInvalid={isInvalid}
      id="fname"
      placeholder="YouTube URL"
      value={text}
      onChange={onChangeHandler(onChange)}
    />
    {isInvalid && (
      <Text mt={2} color="red.500" fontSize="md">
        Couldn't detect YouTube video id.
      </Text>
    )}
  </FormControl>
)
