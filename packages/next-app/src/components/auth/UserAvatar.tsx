import React from "react"
import { Avatar } from "@chakra-ui/core"

type Props = {
  name: string
  thumbnailUrl?: string
}

export const UserAvatar: React.FC<Props> = (props) => (
  <Avatar name={props.name} src={props.thumbnailUrl} size="md" />
)
