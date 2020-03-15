import React from "react"
import { Button, Icon } from "@chakra-ui/core"
import { TimeText } from "./TimeText"

type Props = {
  sec: number
}

export const SetTimeButton = (props: Props) => (
  <Button>
    <Icon name="link" />
    <TimeText ml={1} sec={props.sec} />
  </Button>
)
