import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import TimeText from "./TimeText"

type Props = {
  start: number
  end: number
}

type SizeElement = {
  fontSize: number
  centerPadding: number
}
type Sizes = "sm" | "md" | "lg"

const Size: { [key in Sizes]: SizeElement } = {
  sm: {
    fontSize: 1,
    centerPadding: 1,
  },
  md: {
    fontSize: 2,
    centerPadding: 2,
  },
  lg: {
    fontSize: 3,
    centerPadding: 3,
  },
}

console.log(Size)

const TimeRangeText: React.FC<Props> = ({ start, end }) => (
  <Flex>
    <TimeText sec={start} />
    <Text px={1}>-</Text>
    <TimeText sec={end} />
  </Flex>
)

export default TimeRangeText
