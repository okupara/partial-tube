import { useRef, useLayoutEffect } from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"

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

const loadingScript = async () => {
  for (let i = 0; i < 84; i++) {
    await delay(60)
    if (flags.loadedApi) {
      console.log("loading succeeded")
      return
    }
  }
  if (flags.loadedApi === false) {
    console.log("loading error")
    throw new Error("failed to load youtube script.")
  }
}

const loadYoutube = (
  element: HTMLDivElement | null,
  onStateChange: YT.Events["onStateChange"],
) =>
  new Promise(resolve => {
    if (element === null) {
      throw new Error("HTMLElement Error")
    }
    const player = new window.YT.Player(element, {
      events: {
        onReady() {
          resolve(player)
        },
        onStateChange,
      },
    })
  })

type MachineSchema = {
  states: {
    loadingScript: {}
    loadedScript: {}
    initializingYoutube: {}
    readyPlay: {}
    playingVideo: {}
    ended: {}
  }
}

type MachineContext = {
  player: YT.Player
}

type LoadVideoEvent = {
  type: "LOAD_VIDEO"
  video: { videoId: string; start: number; end: number } | string
}

type MachineEvents =
  | LoadVideoEvent
  | { type: "PLAY_VIDEO" }
  | { type: "MOUNT_YOUTUBE" }
  | { type: "END_VIDEO" }
  | { type: "BE_READY" }

export const youtubeMachine = Machine<MachineContext, MachineSchema, MachineEvents>(
  {
    id: "YoutubeMachine",
    initial: "loadingScript",
    states: {
      loadingScript: {
        invoke: {
          src: loadingScript,
          onDone: { target: "initializingYoutube" },
        },
      },
      loadedScript: {
        on: {
          MOUNT_YOUTUBE: "initializingYoutube",
        },
      },
      initializingYoutube: {
        invoke: {
          src: "createYoutube",
          onDone: {
            target: "readyPlay",
            actions: assign((_, mountedEvent) => ({ player: mountedEvent.data })),
          },
        },
      },
      readyPlay: {
        on: {
          LOAD_VIDEO: {
            actions: ["loadVideo"],
            target: "playingVideo",
          },
          PLAY_VIDEO: "playingVideo",
        },
      },
      playingVideo: {
        // activities: ["consolee"],
        on: {
          LOAD_VIDEO: {
            actions: ["loadVideo"],
          },
          END_VIDEO: "ended",
        },
      },
      ended: {
        on: {
          BE_READY: "readyPlay",
        },
      },
    },
  },
  {
    // activities: {
    //   consolee: ctx => {
    //     console.log("START")
    //     return () => console.log("END")
    //   },
    // },
    actions: {
      // I haven't figured out the way to avoid using "any" here...
      // putting "LoadVideoEvent" occured an type error.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loadVideo: (ctx, { video }: any) => {
        if (typeof video === "string") {
          ctx.player.loadVideoById(video)
        } else {
          ctx.player.loadVideoById({
            videoId: video.videoId,
            startSeconds: video.start,
            endSeconds: video.end,
          })
        }
      },
    },
  },
)

const triedLoadingVideo = (fraction: unknown) => {
  if (typeof fraction !== "number") return false
  return fraction > 0
}

export const useYoutube = () => {
  const divRef = useRef<null | HTMLDivElement>(null)
  const [youtubeState, dispatch] = useMachine(youtubeMachine, {
    services: {
      createYoutube: () =>
        loadYoutube(divRef.current, ev => {
          if (ev.data === YT.PlayerState.PLAYING) {
            dispatch({ type: "PLAY_VIDEO" })
          }
          if (
            ev.data === YT.PlayerState.ENDED &&
            triedLoadingVideo(ev.target.getVideoLoadedFraction())
          ) {
            dispatch({ type: "END_VIDEO" })
          }
        }),
    },
  })
  // why loading script and mounting youtube are split is,
  // - want to start loading script immediately (@TODO consider what's the best way)
  // - want to mount youtube when DOM for components that use this hook is ready
  useLayoutEffect(() => {
    if (youtubeState.matches("loadedScript")) {
      dispatch({ type: "MOUNT_YOUTUBE" })
    }
  }, [youtubeState.value])
  return {
    divRef,
    youtubeState,
    dispatch,
  }
}
