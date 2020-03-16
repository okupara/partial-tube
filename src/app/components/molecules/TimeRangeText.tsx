import React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/core"
import { TimeText } from "./TimeText"

type Props = {
  start: number
  end: number
  color?: FlexProps["color"]
  textAlign?: FlexProps["textAlign"]
  fontSize?: FlexProps["fontSize"]
}

export const TimeRangeText: React.FC<Props> = ({
  start,
  end,
  fontSize,
  ...props
}) => (
  <Flex {...props} justifyContent="center" fontSize={fontSize}>
    <TimeText sec={start} />
    <Text px={1}>-</Text>
    <TimeText sec={end} />
  </Flex>
)
