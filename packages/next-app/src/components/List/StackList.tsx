import React from "react"
import { Stack, Box } from "@chakra-ui/core"

type Direction = "row" | "column"

type Props<T> = {
  spacing?: number
  list: ReadonlyArray<T>
  component: (elem: T) => React.ReactNode
  direction?: Direction
}

export const StackList = <T extends {}>(props: Props<T>) => (
  <Stack spacing={4} direction={props.direction}>
    {props.list.map((c: T, i) => {
      return <Box key={`${i}`}>{props.component(c)}</Box>
    })}
  </Stack>
)
