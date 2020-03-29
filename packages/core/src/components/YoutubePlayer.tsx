import React from "react"
import { useYoutube } from "../hooks/useYoutube"

export type VideoProps = {
  partialVideoId: string
  videoId: string
  start?: number
  end?: number
  onPlayerTimer?: (currentTime: number) => void
}
type Props = {
  onEnd?: () => void
} & VideoProps

export const YoutubePlayer = ({
  partialVideoId,
  videoId,
  start,
  end,
  onEnd,
  onPlayerTimer,
}: Props) => {
  const res = useYoutube()
  const previousId = React.useRef<string | undefined>()

  const shouldLoad = React.useCallback(() => {
    const ret = previousId.current !== partialVideoId
    previousId.current = partialVideoId
    return ret
  }, [partialVideoId])

  React.useEffect(() => {
    if (res.youtubeState.matches("readyPlay") && shouldLoad() === true) {
      if (!start || !end) {
        res.dispatch({
          type: "LOAD_VIDEO",
          video: videoId,
        })
      } else {
        res.dispatch({
          type: "LOAD_VIDEO",
          video: { videoId, start, end },
        })
      }
    }
    if (res.youtubeState.matches("ended")) {
      onEnd?.()
      res.dispatch({ type: "BE_READY" })
    }
    if (res.youtubeState.matches("playingVideo")) {
      const id = window.setInterval(() => {
        onPlayerTimer?.(res.youtubeState.context.player.getCurrentTime())
      }, 120)
      return () => window.clearInterval(id)
    }
  }, [res.youtubeState.value])

  return (
    <div>
      <div ref={res.divRef}>TEST</div>
    </div>
  )
}
