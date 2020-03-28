import React from "react"
import { MarginDecorator } from "./Decorators"
import { PartialVideoThumb } from "../src/components/molecules/PartialVideoThumb"
import { partialVideList } from "../__mocks__/ParitalVideoList"
import { Stack, Box } from "@chakra-ui/core"

const mock = partialVideList[0]
export const partialVideoThumbs = () => (
  <Stack spacing={8} direction="row">
    <Box>
      <PartialVideoThumb
        timeFontSize="sm"
        imageWidth={140}
        videoId={mock.videoId}
        start={mock.start}
        end={mock.end}
      />
    </Box>
    <Box>
      <PartialVideoThumb
        timeFontSize="sm"
        imageWidth={140}
        videoId="g0avWKtqZng"
        start={3600}
        end={3605}
      />
    </Box>
  </Stack>
)

export default {
  title: "Thumbnails",
  decorators: [MarginDecorator],
}
