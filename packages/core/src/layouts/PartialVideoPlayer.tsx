import React from "react"
import { Flex, Box, Text } from "@chakra-ui/core"
import { PlayerController } from "../components/Parts/PlayerController"
import { DescriptionBox } from "../components/Text/DescriptionBox"
import { YoutubePlayer, VideoProps } from "../components/YoutubePlayer"
import { TinyPartialVideoCardList } from "../components/List/TinyPartialVideoCardList"
import { Props as TCProps } from "../components/Card/TinyPartialVideoCard"

// @TODO: improve this, it's hard to understand now.
//        maybe the definition of the PartialVideo model should be here.
type ListProps = ReadonlyArray<
  TCProps & Pick<VideoProps, "partialVideoId"> & { title: string }
>

type Props = {
  partialVideoList: ListProps
}

export const usePlayerQueue = (list: ListProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const changeCurrent = (fn: (current: number) => number) => setCurrentIndex(fn)

  return {
    currentPartialVideo: list[currentIndex],
    next() {
      if (currentIndex >= list.length - 1) return
      changeCurrent((current) => current + 1)
    },
    prev() {
      if (currentIndex === 0) return
      changeCurrent((current) => current - 1)
    },
  }
}

export const Player: React.FC<Props> = (props) => {
  const { currentPartialVideo, ...dispatch } = usePlayerQueue(props.partialVideoList)
  console.log("CUR", currentPartialVideo)

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
        <YoutubePlayer
          partialVideoId={currentPartialVideo.partialVideoId}
          videoId={currentPartialVideo.videoId}
          start={currentPartialVideo.start}
          end={currentPartialVideo.end}
          onEnd={() => dispatch.next()}
        />
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
        <TinyPartialVideoCardList
          titleView={() => (
            <Text fontSize="sm" fontWeight="bold">
              Video List
            </Text>
          )}
          partialVideoList={props.partialVideoList}
        />
      </Box>
    </Flex>
  )
}

export default Player
