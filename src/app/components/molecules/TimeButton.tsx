import React from "react"
import { Button } from "@chakra-ui/core"
import { secToTime } from "../../ui-domain/Time"

type Props = {
  sec: number
}

const TimeText = ({ sec }: Props) => <Button>{secToTime(sec)}</Button>

export default TimeText
