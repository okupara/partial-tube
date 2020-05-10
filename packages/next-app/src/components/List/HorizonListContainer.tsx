import React from "react"
import { Box, Flex, Stack } from "@chakra-ui/core"

type Id = { id: string }

type Props<T extends Id> = {
  titleView: () => React.ReactNode
  elementView: (elem: T) => React.ReactNode
  list: ReadonlyArray<T>
}

export const HorizonListContainer = <T extends Id>({
  titleView,
  elementView,
  list,
}: Props<T>) => {
  return (
    <Flex flexDirection="column" pb={4}>
      <Box borderY="1px" borderColor="gray.200" p={1}>
        {titleView()}
      </Box>
      <Box overflow="auto" px={4} pt={3}>
        <Stack isInline>
          {list.map((c) => (
            <Box key={c.id}>{elementView(c)}</Box>
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}
