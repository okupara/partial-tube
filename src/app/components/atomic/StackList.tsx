import React from "react"
import { Stack, Box } from "@chakra-ui/core"

type Props<T> = {
  spacing?: number
  list: ReadonlyArray<T>
  component: (elem: T) => React.ReactNode
}

const List = <T extends {}>(props: Props<T>) => (
  <Stack spacing={4}>
    {props.list.map((c: T, i) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // return cloneElement(props.component(c) as any, {
      //   key: `${i}`,
      // })
      return <Box key={`${i}`}>{props.component(c)}</Box>
    })}
  </Stack>
)

export default List
