import React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/core"
import TimeText from "./TimeText"

type Props = {
  start: number
  end: number
  color?: FlexProps["color"]
  textAlign?: FlexProps["textAlign"]
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

const TimeRangeText: React.FC<Props> = ({ start, end, ...props }) => (
  <Flex {...props} justifyContent="center">
    <TimeText sec={start} />
    <Text px={1}>-</Text>
    <TimeText sec={end} />
  </Flex>
)

export default TimeRangeText
