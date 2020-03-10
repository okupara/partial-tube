import React from "react"
import { Text } from "@chakra-ui/core"
import HorizonListContainer from "./HorizonListContainer"
import TinyPartialVideoCard, { Props as TCProps } from "./TinyPartialVideoCard"

type Props = {
  partialVideoList: ReadonlyArray<TCProps>
}

const TinyPartialVideoCardList = ({ partialVideoList }: Props) => {
  return (
    <HorizonListContainer
      list={partialVideoList}
      titleView={() => (
        <Text fontSize="sm" fontWeight="bold">
          Video List
        </Text>
      )}
      elementView={pv => (
        <TinyPartialVideoCard
          videoId={pv.videoId}
          comment={pv.comment}
          start={pv.start}
          end={pv.end}
        />
      )}
    />
  )
}

export default TinyPartialVideoCardList
