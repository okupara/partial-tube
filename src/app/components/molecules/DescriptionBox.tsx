import React from "react"
import { Box } from "@chakra-ui/core"

type Props = {
  text: string
  maxHeight?: number | string
}

const replaceNewLine = (text: string) => (
  <div>
    {text.split(/\n/g).map((str, i) => (
      <p key={i}>{str}</p>
    ))}
  </div>
)

export const DescriptionBox: React.FC<Props> = ({ text, maxHeight }) =>
  maxHeight ? (
    <Box maxHeight={maxHeight} overflowY="auto">
      {replaceNewLine(text)}
    </Box>
  ) : (
    <Box>{replaceNewLine(text)}</Box>
  )
