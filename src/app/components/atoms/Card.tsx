import React from "react"
import { Box } from "@chakra-ui/core"

type Props = {
  children?: React.ReactNode
  mb?: number
}

const Card: React.FC<Props> = props => (
  <Box p={5} mb={props.mb} shadow="sm" borderWidth="1px" borderRadius={4}>
    {props.children}
  </Box>
)

export default Card
