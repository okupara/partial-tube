import React from "react"
import { Flex, Box, Text } from "@chakra-ui/core"
import { PartialVideoList, Props as PartialVideoListProps } from "../molecules/PartialVideoCardList"
import { PlayerController } from "../molecules/PlayerController"
import { DescriptionBox } from "../molecules/DescriptionBox"
import { YoutubePlayer } from "../molecules/YoutubePlayer"

type Props = PartialVideoListProps

export const usePlayerQueue = (list: PartialVideoListProps["partialVideoList"]) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const changeCurrent = (fn: (current: number) => number) => setCurrentIndex(fn)

  return {
    currentPartialVideo: list[currentIndex],
    next() {
      changeCurrent(current => current + 1)
    },
    prev() {
      changeCurrent(current => current - 1)
    },
  }
}

export const Player: React.FC<Props> = props => {
  const { currentPartialVideo, ...dispatch } = usePlayerQueue(props.partialVideoList)

  return (
    <Flex flexDirection="column">
      <Box>
        <YoutubePlayer
          videoId={currentPartialVideo.youtubeId}
          start={currentPartialVideo.start}
          end={currentPartialVideo.end}
          onEndVideo={() => dispatch.next()}
        />
      </Box>
      <Box mt={4}>
        <Text as="h2" fontWeight="bold" fontSize="2xl">
          {currentPartialVideo.title}
        </Text>
      </Box>
      <Flex my={6}>
        <Box>
          <PlayerController />
        </Box>
        <Box ml={6}>
          <DescriptionBox text={currentPartialVideo.comment} />
        </Box>
      </Flex>
      <Box>
        <PartialVideoList partialVideoList={props.partialVideoList} />
      </Box>
    </Flex>
  )
}

export default Player
