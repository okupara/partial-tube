import React from "react"
import { Image } from "@chakra-ui/core"

type Props = {
  youtubeId: string
}

const makeThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

const YoutubeImage: React.FC<Props> = props => (
  <Image rounded="md" w={200} src={makeThumbnailUrl(props.youtubeId)} />
)

export default YoutubeImage
