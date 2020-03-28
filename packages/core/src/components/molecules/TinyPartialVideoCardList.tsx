import React from "react"
import { HorizonListContainer } from "./HorizonListContainer"
import { TinyPartialVideoCard, Props as TCProps } from "./TinyPartialVideoCard"

type Props = {
  partialVideoList: ReadonlyArray<TCProps>
  titleView: () => React.ReactNode
}

export const TinyPartialVideoCardList = ({ partialVideoList, titleView }: Props) => {
  return (
    <HorizonListContainer
      list={partialVideoList}
      titleView={() => titleView()}
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
