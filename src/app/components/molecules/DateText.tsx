import React from "react"
import { Text } from "@chakra-ui/core"
import { fillZero } from "../../ui-domain/Time"

type Props = {
  date: Date
}

const convert = (date: Date) =>
  `${date.getFullYear()}/${fillZero(date.getMonth() + 1)}/${fillZero(
    date.getDate(),
  )}`

const DateText: React.FC<Props> = props => <Text>{convert(props.date)}</Text>

export default DateText
