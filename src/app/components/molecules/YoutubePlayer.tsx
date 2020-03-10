import React, {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  useCallback,
} from "react"
import { Flex } from "@chakra-ui/core"

/*
  loading script 
  since don't wanna load that script multiple times, it has flag object below
*/
let flags = {
  loadedApi: false,
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}
const loadIframeApiScript = () => {
  if (typeof YT === "undefined") {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    // const firstScriptTag = document.getElementsByTagName('script')[0]
    // firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag)
    document.body.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => {
      flags = { loadedApi: true }
    }
  } else {
    flags.loadedApi = true
  }
}
loadIframeApiScript()

const delay = (duration: number) =>
  new Promise(res => setTimeout(() => res(), duration))

export type UseYoutubeProps = {
  videoId?: string
}
export type ReturnUseYoutube = {
  refDiv: MutableRefObject<HTMLDivElement | null>
  player: YT.Player | null
  playerState: YT.PlayerState
  readyYoutube: boolean
  loadVideoId: (videoId: string) => void
}

const YtScriptLoadings = [
  "LOADING_SCRIPT",
  "LOADED_SCRIPT",
  "LOADING_SCRIPT_ERROR",
] as const
type YTScriptLoading = typeof YtScriptLoadings[number]

const useLoadingScript = () => {
  const [status, setStatus] = useState<YTScriptLoading>("LOADING_SCRIPT")
  useEffect(() => {
    ;(async () => {
      for (let i = 0; i < 4; i++) {
        if (flags.loadedApi) {
          setStatus("LOADED_SCRIPT")
          break
        }
        await delay(100)
      }
      if (flags.loadedApi === false) {
        setStatus("LOADING_SCRIPT_ERROR")
      }
    })()
  }, [])
  return status
}

type YTPlayerStatus = "NOT_LOADED_PLAYER" | "LOADED_PLAYER"
const useYTPlayer = () => {
  const [status, setStatus] = useState<YTPlayerStatus>("NOT_LOADED_PLAYER")
  const playerRef = useRef<YT.Player | null>(null)
  const init = useCallback(
    (div: HTMLDivElement, callback: YT.Events["onStateChange"]) => {
      playerRef.current = new YT.Player(div, {
        events: {
          onReady() {
            setStatus("LOADED_PLAYER")
          },
          onStateChange: callback,
        },
      })
    },
    [],
  )
  return {
    status,
    init,
    player: playerRef.current,
  }
}

type YoutubePlayerProps = {
  onEndVideo?: () => void
  videoId: string
  start: number
  end: number
}

// seems likely getVideoLoadedFraction returns null or undefined
const triedLoadingVideo = (fraction: unknown) => {
  if (typeof fraction !== "number") return false
  return fraction > 0
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoId,
  start,
  end,
  onEndVideo,
}) => {
  const loadingScriptStatus = useLoadingScript()
  const res = useYTPlayer()
  const refDiv = useRef<HTMLDivElement | null>(null)
  const [playerState, setPlayerState] = useState(-1)

  useEffect(() => {
    if (loadingScriptStatus === "LOADED_SCRIPT" && refDiv.current) {
      res.init(refDiv.current, ev => {
        setPlayerState(ev.data)
      })
    }
  }, [loadingScriptStatus])

  useEffect(() => {
    if (res.status === "LOADED_PLAYER") {
      // res.player?.loadVideoById({ videoId, startSeconds: start, endSeconds: end })
    }
  }, [res.status, videoId, start, end])

  useEffect(() => {
    if (
      res.status === "LOADED_PLAYER" &&
      playerState === YT.PlayerState.ENDED &&
      // youtube api skips a video if the videoId is the same with previous one.
      // this is a hack to prevent it.
      triedLoadingVideo(res.player?.getVideoLoadedFraction())
    ) {
      onEndVideo?.()
    }
  }, [playerState])

  return (
    <Flex backgroundColor="#000" justifyContent="center">
      <div ref={refDiv} />
    </Flex>
  )
}

export default YoutubePlayer
