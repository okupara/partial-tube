import React from "react"
import { Flex, Text, Box } from "@chakra-ui/core"
import { SetTimeButton } from "../Button/SetTimeButton"
import { TimeText } from "../Text/TimeText"

type Props = {
  currentTime: number
  title: string
  selectedSec: number | null
  onTimeSet: () => void
}

const displaySec = (selectedSec: Props["selectedSec"]) =>
  typeof selectedSec === "number" ? (
    <TimeText sec={selectedSec} fontWeight="bold" />
  ) : (
    <Text as="i" color="gray.500">
      ---
    </Text>
  )

export const VideoTimeField = ({
  title,
  currentTime,
  selectedSec,
  onTimeSet,
}: Props) => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Text lineHeight={1.8}>{title} :</Text>
        <Box pl={2} fontSize="lg" width="84px">
          {displaySec(selectedSec)}
        </Box>
      </Flex>
      <Box pt={2}>
        <SetTimeButton size="sm" sec={currentTime} onClick={onTimeSet} />
      </Box>
    </Flex>
  )
}
