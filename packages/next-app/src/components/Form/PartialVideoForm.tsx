import React from "react"
import { Flex, Box, Button, Textarea, useToast } from "@chakra-ui/core"
import { useLoginUser } from "../../contexts/LoginUser"
import { StartEndFormControl } from "../Form/StartEndFormControl"
import { SelectedPlaylistsFormControl } from "../Form/SelectedPlaylistsFormControl"
import { YoutubePlayer } from "../YoutubePlayer"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  videoId: string
  title: string
  onAddVideo?: (video: Input) => void
}

export const PartialVideoForm = ({ videoId, title }: Props) => {
  const userContext = useLoginUser()
  const { input, ...inputDispatch } = useInput()
  const [currentTime, setCurrentTime] = React.useState(0)
  const [executeAdd, resAdd] = useMutation(addQuery)
  const { showToast } = useDoneToast()
  const { data } = useQuery<SelectedPlaylists<GQLPlaylist>>(query)

  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null")
  }

  React.useEffect(() => {
    if (resAdd.data) {
      showToast()
      inputDispatch.reset()
    }
  }, [resAdd.data])

  return (
    <Flex flexDirection="column">
      <Box m="auto" mt={10}>
        <YoutubePlayer
          id={videoId}
          videoId={videoId}
          onPlayerTimer={(sec) => setCurrentTime(sec)}
        />
      </Box>
      <Box mt={5}>
        <StartEndFormControl
          currentTime={currentTime}
          endTime={input.end}
          startTime={input.start}
          onSetEndTime={inputDispatch.setEnd}
          onSetStartTime={inputDispatch.setStart}
        />
      </Box>
      <Box>
        <SelectedPlaylistsFormControl />
      </Box>
      <Box mt={5}>
        <Textarea
          value={input.comment}
          onChange={React.useCallback(
            (e: any) => inputDispatch.setComment(e.currentTarget.value),
            [],
          )}
          height={10}
          placeholder="put some comments..."
        />
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Button
          onClick={() => {
            const playlists = data ? data.selectedPlaylists : []
            executeAdd({
              variables: {
                video: {
                  ...input,
                  title,
                  videoId,
                  playlists: playlists.map((el) => el.id),
                },
              },
            })
          }}
        >
          ADD
        </Button>
      </Flex>
    </Flex>
  )
}

export type Input = {
  start: number | null
  end: number | null
  comment: string
}
const useInput = () => {
  const [input, setInput] = React.useState<Input>({
    start: null,
    end: null,
    comment: "",
  })

  return {
    input,
    setStart: React.useCallback(
      (start: number) => setInput((s) => ({ ...s, start })),
      [input],
    ),
    setEnd: React.useCallback((end: number) => setInput((s) => ({ ...s, end })), [
      input,
    ]),
    setComment: React.useCallback(
      (comment: string) => setInput((s) => ({ ...s, comment })),
      [input],
    ),
    reset: React.useCallback(
      () => setInput({ start: null, end: null, comment: "" }),
      [],
    ),
  }
}

const addQuery = gql`
  mutation AddVideo($video: VideoInput!) {
    addVideo(video: $video) {
      id
    }
  }
`
const useDoneToast = () => {
  const toast = useToast()
  const showToast = React.useCallback(() => {
    toast({
      position: "bottom-right",
      title: "Video added.",
      description: "You can check it on Videos page.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }, [])
  return { showToast }
}

const query = gql`
  query {
    selectedPlaylists @client {
      id
      name
      permission
    }
  }
`
