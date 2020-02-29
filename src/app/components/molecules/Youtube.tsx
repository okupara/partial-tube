import React, { useEffect, useRef, useState, MutableRefObject } from "react"

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
const useYoutube = (props: UseYoutubeProps): ReturnUseYoutube => {
  const refDiv = useRef<HTMLDivElement | null>(null)
  const [playerState, setPlayerState] = useState<YT.PlayerState>(-1)
  let player: YT.Player | null = null
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
          player = new YT.Player(refDiv.current, {
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
    player: player,
    playerState,
    readyYoutube: flags.loadedApi,
  }
}

/* view */

type Props = {
  videoId: string
}
const Youtube: React.FC<Props> = ({ videoId }) => {
  const { refDiv, playerState, readyYoutube } = useYoutube({ videoId })
  useEffect(() => {
    if (readyYoutube) {
      switch (playerState) {
        case YT.PlayerState.PLAYING:
          const timerId = setInterval(() => {
            console.log("11")
          }, 100)
          return () => clearInterval(timerId)
        default:
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          return () => {}
      }
    }
  }, [readyYoutube, playerState])

  return <div ref={refDiv} />
}
export default Youtube
