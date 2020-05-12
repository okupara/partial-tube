import * as React from "react"
import { Heading } from "@chakra-ui/core"

const Component = () => (
  <Heading size="md" as="h1">
    PartialTube
  </Heading>
)

export const AppTitle = React.memo(Component)
