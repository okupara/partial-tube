import React from "react"
import { Button, Icon, ButtonProps } from "@chakra-ui/core"
import { TimeText } from "../shared/TimeText"

type Props = {
  sec: number
} & Omit<ButtonProps, "children">

const Component = ({ sec, ...props }: Props) => (
  <Button {...props}>
    <Icon name="link" />
    <TimeText ml={1} sec={sec} />
  </Button>
)

export const SetTimeButton = React.memo(Component)
