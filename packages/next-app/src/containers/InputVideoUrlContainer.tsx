import * as React from "react"
import { InputYoutubeVideo } from "../components/Form/InputYoutubeVideo"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import gql from "graphql-tag"
import { useLazyQuery } from "@apollo/react-hooks"

type Props = {
  onGetVideoId?: (obj: { videoId: string; title: string }) => void
}

const Component = (props: Props) => {
  const videoUrlState = useVideoUrl()

  let errorMessage: string | null = null
  if (videoUrlState.isInvalidUrl) {
    errorMessage = "Couldn't detect valid YouTube url."
  }
  if (videoUrlState.isNotExistingId) {
    errorMessage = "This video doesn't exist."
  }

  React.useEffect(() => {
    if (videoUrlState.existingVideo.videoId) {
      props.onGetVideoId?.(videoUrlState.existingVideo)
    }
  }, [videoUrlState.existingVideo])

  return (
    <InputYoutubeVideo
      text={videoUrlState.text}
      onChange={videoUrlState.setText}
      errorMessage={errorMessage}
    />
  )
}

export const InputVideoUrlContainer = React.memo(Component)

const useVideoUrl = () => {
  const [text, setText] = React.useState("")
  const [executeQuery, resQuery] = useLazyQuery<GQLYoutubeVideoResponse>(query)
  const [machine, send] = useMachine(videoIdMachine, {
    activities: {
      fetchVideoId: (ctx) => executeQuery({ variables: { videoId: ctx.videoId } }),
    },
  })

  React.useEffect(() => {
    if (!(text === "" && machine.matches("untouched"))) {
      send({ type: "ON_PUT_URL", videoId: text })
    }
  }, [text])

  React.useEffect(() => {
    if (resQuery.data && resQuery.data.youtubeVideo) {
      send({ type: "ON_FETCH_DONE", title: resQuery.data.youtubeVideo.title })
    } else {
      send({ type: "ON_FETCH_ERROR" })
    }
  }, [resQuery.data])

  React.useEffect(() => {
    if (resQuery.error) {
      console.log(resQuery.error)
    }
  }, [resQuery.error])

  const isInvalidUrl = machine.matches("touched.invalidUrl")
  const isNotExistingId = machine.matches("touched.notExisitingId")

  return {
    isInvalidUrl,
    isNotExistingId,
    existingVideo: {
      videoId: machine.context.existingVideoId!,
      title: machine.context.existingTitle!,
    },
    text,
    setText,
  }
}

const query = gql`
  query YoutubeVideo($videoId: String!) {
    youtubeVideo(videoId: $videoId) {
      id
      title
      description
    }
  }
`
type GQLYoutubeVideo = {
  id: string
  title: string
  description: string
}
type GQLYoutubeVideoResponse = {
  youtubeVideo: GQLYoutubeVideo | null
}

const reg = /https*:\/\/(m\.|www\.)*youtube\.com\/watch\?/
export const extractVideoId = (s: string) => {
  if (s.match(reg)) {
    const splitted = s.split(reg)
    const targets = splitted[splitted.length - 1]
    return targets.split("&").reduce<string | null>((p, c) => {
      const tmp = c.split("=")
      if (!tmp[1]) {
        return p
      }
      if (tmp[0] === "v") {
        return tmp[1]
      }
      return p
    }, null)
  }
  return null
}

const videoIdCommonEvents = {
  on: {
    ON_PUT_URL: [
      { target: "validUrl", cond: "validateURL" },
      { target: "invalidUrl" },
    ],
  },
}

const videoIdMachine = Machine<
  YoutubeUrlContext,
  YoutubeUrlSchema,
  YoutubeUrlEvents
>(
  {
    initial: "untouched",
    states: {
      untouched: {
        on: {
          ON_PUT_URL: [
            { target: "touched.validUrl", cond: "validateURL" },
            { target: "touched.invalidUrl" },
          ],
        },
      },
      touched: {
        states: {
          invalidUrl: {
            ...videoIdCommonEvents,
          },
          validUrl: {
            activities: ["fetchVideoId"],
            on: {
              ON_FETCH_ERROR: "notExistingId",
              ON_FETCH_DONE: {
                target: "existingId",
                actions: assign((ctx, event: FetchDoneEvent) => ({
                  existingVideoId: ctx.videoId,
                  existingTitle: event.title,
                })),
              },
            },
          },
          notExistingId: { ...videoIdCommonEvents },
          existingId: { ...videoIdCommonEvents },
        },
      },
    },
  },
  {
    guards: {
      validateURL: (ctx, event) => {
        if (event.type !== "ON_PUT_URL") {
          return false
        }
        const videoId = extractVideoId(event.videoId)
        if (videoId) {
          ctx.videoId = videoId
          return true
        }
        return false
      },
    },
  },
)

type PutUrlEvent = {
  type: "ON_PUT_URL"
  videoId: string
}
type FetchDoneEvent = {
  type: "ON_FETCH_DONE"
  title: string
}

type YoutubeUrlEvents = PutUrlEvent | { type: "ON_FETCH_ERROR" } | FetchDoneEvent

type YoutubeUrlSchema = {
  states: {
    untouched: {}
    touched: {
      states: {
        invalidUrl: {}
        validUrl: {}
        notExistingId: {}
        existingId: {}
      }
    }
  }
}

type YoutubeUrlContext = {
  videoId: string | null
  existingVideoId: string | null
  existingTitle: string
}
