import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { AddPartialVideoForm } from "../components/Form/AddPartialVideoForm"
import { YoutubePlayer } from "../components/YoutubePlayer"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
import { InputYoutubeVideo } from "../components/Form/InputYoutubeVideo"
import gql from "graphql-tag"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"

type Props = {
  videoId: string
}

export const AddPartialVideos = ({ videoId }: Props) => {
  const [currentTime, setCurrentTime] = React.useState(0)
  const { text, setText, isInvalidUrl } = useVideoURL()
  const userContext = useLoginUser()
  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null.")
  }

  return (
    <Authenticated user={userContext.user}>
      <Flex flexDirection="column" mt={24} px={8}>
        <Box>
          <InputYoutubeVideo
            isInvalid={isInvalidUrl}
            text={text}
            onChange={setText}
          />
        </Box>
        <Box mt={5}>
          <YoutubePlayer
            id={videoId}
            videoId={videoId}
            onPlayerTimer={(sec) => setCurrentTime(sec)}
          />
        </Box>
        <Box mt={5}>
          <AddPartialVideoForm currentTime={currentTime} />
        </Box>
      </Flex>
    </Authenticated>
  )
}

// const query = gql`
//   query YoutubeVideo($videoId: String!) {
//     youtubeVideo(videoId: $VideoId) {
//       id
//       title
//       description
//     }
//   }
// `
const useVideoURL = () => {
  const [text, setText] = React.useState("")
  const videoIDRef = React.useRef<string | null>(null)
  const initFlagRef = React.useRef(false)
  const [machine, dispatch] = useMachine(YoutubeURLMachine)

  React.useEffect(() => {
    if (initFlagRef.current) {
      const videoId = extractVideoId(text)
      videoIDRef.current = videoId
      dispatch({ type: "UPDATE_TEXT", videoId })
    } else {
      initFlagRef.current = true
    }
  }, [text])

  return {
    isUntouched: machine.matches("untouched"),
    isInvalidUrl: machine.matches("invalidUrl"),
    setText,
    text,
  }
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

const commonStateMachine = {
  on: {
    UPDATE_TEXT: [
      {
        target: "validUrl",
        cond: "validateVideoId",
      },
      {
        target: "invalidUrl",
      },
    ],
  },
}

const YoutubeURLMachine = Machine<{}, YoutubeURLSchema, YoutubeURLEvents>(
  {
    initial: "untouched",
    states: {
      untouched: commonStateMachine,
      validUrl: commonStateMachine,
      invalidUrl: commonStateMachine,
    },
  },
  {
    guards: {
      validateVideoId: (_, event: UpdateTextEvent) => {
        return event.videoId !== null
      },
    },
  },
)

type YoutubeURLSchema = {
  states: {
    untouched: {}
    validUrl: {}
    invalidUrl: {}
  }
}
type UpdateTextEvent = {
  type: "UPDATE_TEXT"
  videoId: string | null
}

type YoutubeURLEvents = UpdateTextEvent
