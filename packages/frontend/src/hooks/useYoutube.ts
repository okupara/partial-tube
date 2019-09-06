import React, { useRef, useState, MutableRefObject } from 'react'

/*
  loading script 
  since don't wanna load that script multiple times, it has flag object below
*/
let flags = {
  loadedApi: false,
  triedLoading: false
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}
const loadIframeApiScript = () => {
  if (typeof YT === 'undefined') {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
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

/*
  hooks part
  lading youtube video, however it has to wait until loading script completed
*/

type LoadYoutubeParams = {
  elem: HTMLDivElement
  videoId: string
  onLoaded?: () => void
  onStartedPlaying: (player: YT.Player) => void
  onPausedPlaying: (player: YT.Player) => void
}

const loadYoutube = (param: LoadYoutubeParams) => {
  const { elem, videoId, onStartedPlaying, onPausedPlaying } = param
  const player = new YT.Player(elem, {
    videoId,
    events: {
      onReady(_) {
        //   ev.target.playVideo()
      },
      onStateChange(ev) {
        if (ev.data === YT.PlayerState.PLAYING) {
          onStartedPlaying(player)
        }
        if (ev.data === YT.PlayerState.PAUSED) {
          onPausedPlaying(player)
        }
      }
    }
  })
}

const delay = (duration: number) =>
  new Promise(res => setTimeout(() => res(), duration))

const createYTCallbacks = (
  timerId: number,
  setCurrentTime: (i: number) => void
) => {
  return {
    onStartedPlaying(player: YT.Player) {
      if (timerId !== 0) {
        window.clearInterval(timerId)
      }
      window.setInterval(() => {
        setCurrentTime(player.getCurrentTime())
      }, 250)
    },
    onPausedPlaying() {
      window.clearInterval(timerId)
    }
  }
}

type SearchVideoParams = {
  refDiv: MutableRefObject<HTMLDivElement | null>
  refTimerId: MutableRefObject<number>
  setCurrentTime: (time: number) => void
}

const buildLoadVideo = (params: SearchVideoParams) => async (
  videoId: string
) => {
  // waits until Iframe script is loaded
  for (let i = 0; i < 4; i++) {
    if (flags.loadedApi) break
    await delay(150)
  }
  console.log('flags', flags)
  if (!flags.loadedApi) {
    console.error('maybe offline??')
  } else {
    if (params.refDiv.current) {
      loadYoutube({
        elem: params.refDiv.current,
        videoId,
        ...createYTCallbacks(params.refTimerId.current, params.setCurrentTime)
      })
    }
  }
}

export type Youtube = {
  refDiv: React.MutableRefObject<HTMLDivElement | null>
  currentTime: number
  failedLoading: boolean
  loadVideo: (videoId: string) => void
}
const useYoutube = (): Youtube => {
  const refDiv = useRef<HTMLDivElement | null>(null)
  const refTimerId = useRef(0)
  const [currentTime, setCurrentTime] = useState(0)
  const refLoadDispatcher = React.useCallback(
    buildLoadVideo({
      refDiv,
      refTimerId,
      setCurrentTime
    }),
    []
  )

  return {
    refDiv,
    currentTime,
    loadVideo: refLoadDispatcher,
    failedLoading: flags.triedLoading && !flags.loadedApi
  }
}

export default useYoutube
