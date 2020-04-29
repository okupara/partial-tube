import * as React from "react"
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/core"

type Props = {
  text: string
  onChange?: (text: string) => void
  errorMessage?: string | null
}

const onChangeHandler = (fn: Props["onChange"]) => (
  e: React.FormEvent<HTMLInputElement>,
) => {
  fn?.(e.currentTarget.value)
}

export const InputYoutubeVideo = ({ text, onChange, errorMessage }: Props) => {
  const isInvalid = !!errorMessage
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="fname">YouTube URL</FormLabel>
      <Input
        isInvalid={!!errorMessage}
        id="fname"
        placeholder="YouTube URL"
        value={text}
        onChange={onChangeHandler(onChange)}
      />
      {isInvalid && (
        <Text mt={2} color="red.500" fontSize="md">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  )
}
