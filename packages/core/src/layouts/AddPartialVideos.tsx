import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { AddPartialVideoForm } from "../components/Form/AddPartialVideoForm"
import { TinyPartialVideoCardList } from "../components/List/TinyPartialVideoCardList"
import { AddPartialVideoListTitle } from "../components/Parts/AddPartialVideoListTitle"
import { YoutubePlayer } from "../components/YoutubePlayer"

type Model = {
  videoId: string
  title: string
  start: number
  end: number
  comment: string
}

type Props = {
  videoId: string
  addedPartialVideoList: ReadonlyArray<Model>
}
const TitleView = ({ count }: { count: number }) => (
  <Box py={1}>
    <AddPartialVideoListTitle addedItemCount={count} />
  </Box>
)

export const AddPartialVideos = ({ addedPartialVideoList }: Props) => {
  const [currentTime, setCurrentTime] = React.useState(0)
  return (
    <Flex flexDirection="column">
      <Box>
        <YoutubePlayer
          id="kjsdkfjaksdjf"
          videoId="mQSbaGNzNzc"
          onPlayerTimer={(sec) => setCurrentTime(sec)}
        />
      </Box>
      <Box mt={6}>
        <AddPartialVideoForm currentTime={currentTime} />
      </Box>
      <Box mt={6}>
        <TinyPartialVideoCardList
          partialVideoList={addedPartialVideoList}
          titleView={() => <TitleView count={addedPartialVideoList.length} />}
        />
      </Box>
    </Flex>
  )
}
