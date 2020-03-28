import React from "react"
import { YoutubeImage } from "../src/components/molecules/YoutubeImage"
import { MarginDecorator } from "./Decorators"
import { Stack, Box } from "@chakra-ui/core"

export const plainYoutubeImage = () => (
  <Stack spacing={8} direction="row">
    <Box>
      <YoutubeImage youtubeImageSize="mqdefault" width={200} videoId="w4A1CHEpqvw" />
    </Box>
    <Box>
      <YoutubeImage youtubeImageSize="default" width={100} videoId="w4A1CHEpqvw" />
    </Box>
  </Stack>
)

export default {
  title: "Thumbnails",
  decorators: [MarginDecorator],
}
