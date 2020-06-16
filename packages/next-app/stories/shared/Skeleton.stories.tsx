import * as React from "react"
import { Skeleton } from "@chakra-ui/core"
import { MarginDecorator } from "../Decorators"

export const skeleton = () => (
  <div>
    <Skeleton height={5} my={3} />
    <Skeleton height={5} my={3} />
    <Skeleton height={5} my={3} />
  </div>
)

export default {
  title: "shared",
  decorators: [MarginDecorator],
}
