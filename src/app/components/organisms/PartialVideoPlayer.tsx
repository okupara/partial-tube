import React from "react"
import { Flex, Box, Text } from "@chakra-ui/core"
import { Props as PartialVideoListProps } from "../molecules/PartialVideoCardList"
import { PlayerController } from "../molecules/PlayerController"
import { DescriptionBox } from "../molecules/DescriptionBox"
// import { YoutubePlayer } from "../molecules/YoutubePlayer"
import { TinyPartialVideoCardList } from "../molecules/TinyPartialVideoCardList"

type Props = PartialVideoListProps

export const usePlayerQueue = (list: PartialVideoListProps["partialVideoList"]) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const changeCurrent = (fn: (current: number) => number) => setCurrentIndex(fn)

  return {
    currentPartialVideo: list[currentIndex],
    next() {
      if (currentIndex >= list.length - 1) return
      changeCurrent(current => current + 1)
    },
    prev() {
      if (currentIndex === 0) return
      changeCurrent(current => current - 1)
    },
  }
}

export const Player: React.FC<Props> = props => {
  const { currentPartialVideo /*, ...dispatch*/ } = usePlayerQueue(
    props.partialVideoList,
  )

  return (
    <Flex
      flexDirection="column"
      height="100%"
      minHeight="100vh"
      position="relative"
      boxSizing="border-box"
      pb="170px"
    >
      <Box height="360px">
        {/* <YoutubePlayer
          videoId={currentPartialVideo.videoId}
          start={currentPartialVideo.start}
          end={currentPartialVideo.end}
          onEndVideo={() => dispatch.next()}
        /> */}
      </Box>
      <Box pt={1} pl={2}>
        <Text as="h2" fontWeight="bold" fontSize="xl">
          {currentPartialVideo.title}
        </Text>
      </Box>
      <Flex pt={3} flexDirection="column">
        <Box px={3}>
          <PlayerController />
        </Box>
        <Box px={4} pt={4}>
          <DescriptionBox text={currentPartialVideo.comment} />
        </Box>
      </Flex>
      <Box position="absolute" bottom={0} width="100%">
        <TinyPartialVideoCardList partialVideoList={props.partialVideoList} />
      </Box>
    </Flex>
  )
}

export default Player
