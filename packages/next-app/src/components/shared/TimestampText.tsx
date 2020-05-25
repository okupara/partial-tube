import React from "react"
import { Text } from "@chakra-ui/core"
import { fillZero } from "../../utils/Time"

type Props = {
  time: number
}

const convert = (time: number) => {
  const date = new Date()
  date.setTime(Math.floor(time))
  return `${date.getFullYear()}/${fillZero(date.getMonth() + 1)}/${fillZero(
    date.getDate(),
  )}`
}

export const TimestampText: React.FC<Props> = (props) => (
  <Text>{convert(props.time)}</Text>
)
