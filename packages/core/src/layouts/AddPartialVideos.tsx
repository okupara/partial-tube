import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { AddPartialVideoForm } from "../components/Form/AddPartialVideoForm"
import { YoutubePlayer } from "../components/YoutubePlayer"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
// import { InputYoutubeVideo } from "../components/Form/InputYoutubeVideo"
import { InputVideoUrlContainer } from "../containers/InputVideoUrlContainer"

export const AddPartialVideos = () => {
  const [currentTime, setCurrentTime] = React.useState(0)
  const [videoId, setVideoId] = React.useState<string | null>(null)
  const userContext = useLoginUser()
  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null.")
  }

  return (
    <Authenticated user={userContext.user}>
      <Flex flexDirection="column" mt={24} px={8}>
        <Box>
          {/* <InputYoutubeVideo text={props.inputText} onChange={props.onChangeText} /> */}
          <InputVideoUrlContainer onGetVideoId={setVideoId} />
        </Box>
        {videoId && (
          <>
            <Box mt={5}>
              <YoutubePlayer
                id={videoId}
                videoId={videoId}
                onPlayerTimer={(sec) => setCurrentTime(sec)}
              />
            </Box>
            <Box mt={5}>
              <AddPartialVideoForm currentTime={currentTime} />
            </Box>
          </>
        )}
      </Flex>
    </Authenticated>
  )
}
