import React from "react"
import { Flex, Box, Button, Text } from "@chakra-ui/core"
import { ItemCountText } from "./ItemCountText"

type Props = {
  addedItemCount: number
}

export const AddPartialVideoListTitle = ({ addedItemCount }: Props) => {
  const disabled = addedItemCount === 0
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <Box>
          <ItemCountText fontWeight="bold" fontSize="md" count={addedItemCount} />
        </Box>
        <Box ml={2}>
          <Text fontSize="sm" lineHeight={1.8}>
            added
          </Text>
        </Box>
      </Flex>
      <Box>
        <Button size="sm" isDisabled={disabled} variantColor="pink">
          save
        </Button>
      </Box>
    </Flex>
  )
}
