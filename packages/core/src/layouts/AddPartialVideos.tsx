import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { AddPartialVideoForm } from "../components/Form/AddPartialVideoForm"
import { YoutubePlayer } from "../components/YoutubePlayer"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"

type Props = {
  videoId: string
}

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
      </Flex>
    </Authenticated>
  )
}
