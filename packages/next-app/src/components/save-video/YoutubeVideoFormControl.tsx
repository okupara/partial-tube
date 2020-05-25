import * as React from "react"
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/core"
import { useLazyQuery } from "@apollo/react-hooks"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import gql from "graphql-tag"

type Props = {
  onGetVideoId: (obj: { videoId: string; title: string }) => void
}

const onChangeHandler = (fn: (text: string) => void) => (
  e: React.FormEvent<HTMLInputElement>,
) => {
  fn?.(e.currentTarget.value)
}

export const YoutubeVideoFormControl = ({ onGetVideoId }: Props) => {
  const { errorMessage, setText, text } = useVideoUrl(onGetVideoId)

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="fname">YouTube URL</FormLabel>
      <Input
        isInvalid={!!errorMessage}
        id="fname"
        placeholder="YouTube URL"
        value={text}
        onChange={onChangeHandler(setText)}
      />
      {errorMessage && (
        <Text mt={2} color="red.500" fontSize="md">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  )
}

const useVideoUrl = (callback: Props["onGetVideoId"]) => {
  const [text, setText] = React.useState("")
  const [executeQuery, queryRes] = useLazyQuery<GQLYoutubeVideoResponse>(query)
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
    if (queryRes.data && queryRes.data.youtubeVideo) {
      send({ type: "ON_FETCH_EXISTING", title: queryRes.data.youtubeVideo.title })
    } else {
      send({ type: "ON_FETCH_NOTHING" })
    }
  }, [queryRes.data])

  React.useEffect(() => {
    if (machine.context.existingVideoId) {
      callback({
        videoId: machine.context.existingVideoId,
        title: machine.context.existingTitle,
      })
    }
  }, [machine.context.existingVideoId])

  React.useEffect(() => {
    if (queryRes.error) {
      console.error(queryRes.error)
      send({ type: "ON_GQL_ERROR" })
    }
  }, [queryRes.error])

  return {
    errorMessage: getErrorMessage(machine.value as string),
    text,
    setText,
  }
}

const Errors = {
  invalidUrl: {
    type: "touched.invalidUrl",
    message: "Couldn't detect valid YouTube url.",
  },
  notExistingId: {
    type: "touched.notExisitingId",
    message: "This video doesn't exist.",
  },
  gqlError: {
    type: "touched.gqlError",
    message: "Error occured during the request.",
  },
}

const getErrorMessage = (machineValue: string) => {
  switch (machineValue) {
    case Errors.invalidUrl.type:
      return Errors.invalidUrl.message
    case Errors.notExistingId.type:
      return Errors.notExistingId.message
    case Errors.gqlError.type:
      return Errors.gqlError.message
    default:
      return null
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
              ON_FETCH_NOTHING: "notExistingId",
              ON_FETCH_EXISTING: {
                target: "existingId",
                actions: assign((ctx, event: FetchDoneEvent) => ({
                  existingVideoId: ctx.videoId,
                  existingTitle: event.title,
                })),
              },
              ON_GQL_ERROR: "gqlError",
            },
          },
          notExistingId: { ...videoIdCommonEvents },
          existingId: { ...videoIdCommonEvents },
          gqlError: { ...videoIdCommonEvents },
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
  type: "ON_FETCH_EXISTING"
  title: string
}

type YoutubeUrlEvents =
  | PutUrlEvent
  | { type: "ON_FETCH_NOTHING" }
  | { type: "ON_GQL_ERROR" }
  | FetchDoneEvent

type YoutubeUrlSchema = {
  states: {
    untouched: {}
    touched: {
      states: {
        invalidUrl: {}
        validUrl: {}
        notExistingId: {}
        existingId: {}
        gqlError: {}
      }
    }
  }
}

type YoutubeUrlContext = {
  videoId: string | null
  existingVideoId: string | null
  existingTitle: string
}
