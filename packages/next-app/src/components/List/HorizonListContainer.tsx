import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { StackList } from "../List/StackList"

type Props<T> = {
  titleView: () => React.ReactNode
  elementView: (elem: T) => React.ReactNode
  list: ReadonlyArray<T>
}

export const HorizonListContainer = <T extends {}>({
  titleView,
  elementView,
  list,
}: Props<T>) => {
  return (
    <Flex flexDirection="column" pb={4}>
      <Box borderY="1px" borderColor="gray.200" p={1}>
        {titleView()}
      </Box>
      <Box overflow="auto" px={4} pt={4}>
        <StackList direction="row" list={list} component={elementView} />
      </Box>
    </Flex>
  )
}
