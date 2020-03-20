import React from "react"
import { useYoutube } from "../../hooks/useYoutube"

export type VideoProps = {
  partialVideoId: string
  videoId: string
  start: number
  end: number
}
type Props = {
  onEnd: () => void
} & VideoProps

export const YoutubePlayer = ({
  partialVideoId,
  videoId,
  start,
  end,
  onEnd,
}: Props) => {
  const res = useYoutube()
  // don't wanna cause re-rendering

  React.useEffect(() => {
    if (res.youtubeState.matches("readyPlay")) {
      res.dispatch({
        type: "LOAD_VIDEO",
        partialVideo: { videoId, start, end },
      })
    }
    if (res.youtubeState.matches("ended")) {
      onEnd()
    }
  }, [res.youtubeState.value])

  React.useEffect(() => {
    // don't wanna send LOAD_VIDEO until the first video finished.
    console.log(1)
    if (res.youtubeState.matches("ended")) {
      console.log(2)
      res.dispatch({
        type: "LOAD_VIDEO",
        partialVideo: { videoId, start, end },
      })
    }
  }, [partialVideoId])

  return (
    <div>
      <div ref={res.divRef}>TEST</div>
    </div>
  )
}
