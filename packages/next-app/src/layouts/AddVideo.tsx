import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { VideoForm } from "../components/save-video/VideoForm"
import { YoutubeVideoFormControl } from "../components/save-video/YoutubeVideoFormControl"

export const AddVideo = () => {
  const [video, setVideo] = React.useState<{
    videoId: string | null
    title: string
  }>({ videoId: null, title: "" })

  return (
    <Flex flexDirection="column" px={8} mb={20}>
      <Box>
        <YoutubeVideoFormControl onGetVideoId={setVideo} />
      </Box>
      {video.videoId && (
        <Box mt={5}>
          <VideoForm videoId={video.videoId} title={video.title} />
        </Box>
      )}
    </Flex>
  )
}
