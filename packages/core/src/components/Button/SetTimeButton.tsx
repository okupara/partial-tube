import React from "react"
import { Button, Icon, ButtonProps } from "@chakra-ui/core"
import { TimeText } from "../Text/TimeText"

type Props = {
  sec: number
} & Omit<ButtonProps, "children">

export const SetTimeButton = ({ sec, ...props }: Props) => (
  <Button {...props}>
    <Icon name="link" />
    <TimeText ml={1} sec={sec} />
  </Button>
)
