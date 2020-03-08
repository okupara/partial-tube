import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { PartialVideoList, Props as PartialVideoListProps } from "../molecules/PartialVideoCardList"
import { PlayerController } from "../molecules/PlayerController"
import { DescriptionBox } from "../molecules/DescriptionBox"
import { YoutubePlayer } from "../molecules/YoutubePlayer"

type Props = PartialVideoListProps

export const usePlayerQueue = (list: PartialVideoListProps["partialVideoList"]) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const changeCurrent = (fn: (current: number) => number) => setCurrentIndex(fn)
  console.log("CURRENT", currentIndex)

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
  console.log("KAWA", currentPartialVideo)

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
      <Flex>
        <Box>
          <PlayerController />
        </Box>
        <Box>
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
