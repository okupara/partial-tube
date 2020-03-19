import React from "react"
import { useYoutube } from "../../hooks/useYoutube"
// import { useMachine } from "@xstate/react"

type Props = {
  partialVideoId: string
  videoId: string
  start: number
  end: number
  onEnd: () => void
}

export const YoutubePlayer = (props: Props) => {
  const res = useYoutube()
  // don't wanna cause re-rendering

  React.useEffect(() => {
    console.log(res.youtubeState)
    if (res.youtubeState.matches("idle")) {
      res.dispatch({
        type: "LOAD_VIDEO",
        partialVideo: { videoId: "awjTKeS9Wvo", start: 300, end: 308 },
      })
    }
    if (res.youtubeState.matches("ended")) {
      props.onEnd()
    }
  }, [res.youtubeState.value])

  React.useEffect(() => {
    // don't wanna send LOAD_VIDEO until the first video finished.
    if (res.youtubeState.matches("ended")) {
      res.dispatch({
        type: "LOAD_VIDEO",
        partialVideo: { videoId: props.videoId, start: props.start, end: props.end },
      })
    }
  }, [props.partialVideoId])

  return (
    <div>
      <div ref={res.divRef}>TEST</div>
    </div>
  )
}
