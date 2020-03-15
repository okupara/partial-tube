import React from "react"
import { Image } from "@chakra-ui/core"

type YoutubeImageSize = "default" | "mqdefault" | "hqdefault"

type Props = {
  videoId: string
  youtubeImageSize: YoutubeImageSize
  width: number
}

const makeThumbnailUrl = (youtubeId: string, sizeName: YoutubeImageSize) =>
  `https://img.youtube.com/vi/${youtubeId}/${sizeName}.jpg`

export const YoutubeImage: React.FC<Props> = props => (
  <Image
    borderRadius="md"
    w={props.width}
    src={makeThumbnailUrl(props.videoId, props.youtubeImageSize)}
  />
)
