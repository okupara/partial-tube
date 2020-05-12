import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { PartialVideoForm } from "../components/Form/PartialVideoForm"
import { InputVideoUrlContainer } from "../containers/InputVideoUrlContainer"

export const AddVideo = () => {
  const [video, setVideo] = React.useState<{
    videoId: string | null
    title: string
  }>({ videoId: null, title: "" })

  return (
    <Flex flexDirection="column" px={8} mb={20}>
      <Box>
        <InputVideoUrlContainer onGetVideoId={setVideo} />
      </Box>
      {video.videoId && (
        <Box mt={5}>
          <PartialVideoForm videoId={video.videoId} title={video.title} />
        </Box>
      )}
    </Flex>
  )
}
