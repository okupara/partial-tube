import { useEffect, useRef, useState, MutableRefObject } from "react"

/*
  loading script 
  since don't wanna load that script multiple times, it has flag object below
*/
const flags = {
  loadedApi: false,
  triedLoading: false,
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
      flags.loadedApi = true
    }
  } else {
    flags.loadedApi = true
  }
}
loadIframeApiScript()

const delay = (duration: number) => new Promise(res => setTimeout(() => res(), duration))

export type UseYoutubeProps = {
  videoId: string
}
export type ReturnUseYoutube = {
  refDiv: MutableRefObject<HTMLDivElement | null>
  player: YT.Player | null
  playerState: YT.PlayerState
  readyYoutube: boolean
}
export const useYoutube = (props: UseYoutubeProps): ReturnUseYoutube => {
  const refDiv = useRef<HTMLDivElement | null>(null)
  const [playerState, setPlayerState] = useState<YT.PlayerState>(-1)
  const playerRef = useRef<YT.Player | null>(null)

  useEffect(() => {
    ;(async () => {
      for (let i = 0; i < 4; i++) {
        if (flags.loadedApi) break
        await delay(150)
      }
      if (!flags.loadedApi) {
        console.error("maybe offline??")
      } else {
        if (refDiv.current) {
          playerRef.current = new YT.Player(refDiv.current, {
            videoId: props.videoId,
            events: {
              onReady() {
                //   ev.target.playVideo()
              },
              onStateChange(ev) {
                setPlayerState(ev.data)
              },
            },
          })
        }
      }
    })()
  }, [])
  return {
    refDiv,
    player: playerRef.current,
    playerState,
    readyYoutube: flags.loadedApi,
  }
}
