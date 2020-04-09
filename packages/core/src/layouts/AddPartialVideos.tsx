import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { AddPartialVideoForm } from "../components/Form/AddPartialVideoForm"
// import { TinyPartialVideoCardList } from "../components/List/TinyPartialVideoCardList"
// import { AddPartialVideoListTitle } from "../components/Parts/AddPartialVideoListTitle"
import { YoutubePlayer } from "../components/YoutubePlayer"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"

// type Model = {
//   videoId: string
//   title: string
//   start: number
//   end: number
//   comment: string
// }

type Props = {
  videoId: string
  // addedPartialVideoList: ReadonlyArray<Model>
}
// const TitleView = ({ count }: { count: number }) => (
//   <Box py={1}>
//     <AddPartialVideoListTitle addedItemCount={count} />
//   </Box>
// )

export const AddPartialVideos = ({ videoId }: Props) => {
  const [currentTime, setCurrentTime] = React.useState(0)
  const userContext = useLoginUser()
  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null.")
  }

  return (
    <Authenticated user={userContext.user}>
      <Flex flexDirection="column" mt={24} px={8}>
        <Box>
          <YoutubePlayer
            id={videoId}
            videoId={videoId}
            onPlayerTimer={(sec) => setCurrentTime(sec)}
          />
        </Box>
        <Box mt={6}>
          <AddPartialVideoForm currentTime={currentTime} />
        </Box>
        {/* <Box mt={6}>
          <TinyPartialVideoCardList
            partialVideoList={addedPartialVideoList}
            titleView={() => <TitleView count={addedPartialVideoList.length} />}
          />
        </Box> */}
      </Flex>
    </Authenticated>
  )
}
