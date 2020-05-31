import * as React from "react"
import { Flex, Box, Button, Textarea } from "@chakra-ui/core"
import { StartEndFormControl } from "./StartEndFormControl"
import { SelectedPlaylistsFormControl } from "./SelectedPlaylistsFormControl"
import { YoutubePlayer } from "../shared/YoutubePlayer"
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks"
import { useToast } from "../../hooks/useToast"
import gql from "graphql-tag"

type Props = {
  id?: string
  videoId: string
  title: string
  start?: number | null
  end?: number | null
  comment?: string
  playlists?: ReadonlyArray<GQLPlaylist>
  onAddVideo?: (video: Input) => void
}

export const VideoForm = ({
  id,
  videoId,
  title,
  start,
  end,
  comment,
  playlists,
}: Props) => {
  const { input, loadingAdd, executeAdd, ...inputDispatch } = useVideoForm({
    id,
    videoId,
    title,
    start: start ?? null,
    end: end ?? null,
    comment: comment ?? "",
    playlists,
  })
  const [currentTime, setCurrentTime] = React.useState(0)

  return (
    <Flex flexDirection="column">
      <Box m="auto">
        <YoutubePlayer
          id={videoId}
          videoId={videoId}
          onPlayerTimer={(sec) => setCurrentTime(sec)}
        />
      </Box>
      <Box mt={5}>
        <StartEndFormControl
          currentTime={currentTime}
          endTime={input.end ?? null}
          startTime={input.start ?? null}
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
          onChange={(e: any) => inputDispatch.setComment(e.currentTarget.value)} // difficult to be typesafe with onChange on Textarea...
          height={10}
          placeholder="put some comments..."
        />
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Button
          loadingText="SAVING"
          isLoading={loadingAdd}
          onClick={() => executeAdd()}
        >
          SAVE
        </Button>
      </Flex>
    </Flex>
  )
}

type Input = Omit<Props, "onAddVideo">
type InputStateType = Omit<Input, "playlists">

const useVideoForm = (initValues: Input) => {
  const [input, setInput] = React.useState<InputStateType>({
    id: initValues.id,
    title: initValues.title,
    start: initValues.start,
    end: initValues.end,
    comment: initValues.comment,
    videoId: initValues.videoId,
  })
  const [executeAdd, addRes] = useMutation(mutation)
  const client = useApolloClient()
  const selectedPlaylistsRes = useQuery<SelectedPlaylists<GQLPlaylist>>(query)
  const selectedPlaylists = selectedPlaylistsRes.data?.selectedPlaylists
  const { showToast } = useToast()

  React.useEffect(() => {
    if (addRes.data) {
      showToast({
        title: "A video is added successfully.",
        description: "You can check it on videos page.",
      })
      setInput((state) =>
        // In edit mode, only resets comment
        state.id ? { ...state } : { ...state, start: null, end: null, comment: "" },
      )
    }
  }, [addRes.data])
  React.useEffect(() => {
    client.writeData<SelectedPlaylists<GQLPlaylist>>({
      data: { selectedPlaylists: initValues.playlists ?? [] },
    })
  }, [])

  return {
    loadingAdd: addRes.loading,
    executeAdd: React.useCallback(() => {
      executeAdd({
        variables: {
          video: { ...input, playlists: selectedPlaylists?.map((item) => item.id) },
        },
      })
    }, [input, selectedPlaylistsRes.data]),
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
    setPlaylists: React.useCallback(
      () => setInput((s) => ({ ...s, playlists: selectedPlaylists })),
      [input, selectedPlaylistsRes.data],
    ),
  }
}

const mutation = gql`
  mutation AddVideo($video: VideoInput!) {
    video(video: $video) {
      id
    }
  }
`
const query = gql`
  query {
    selectedPlaylists @client {
      id
      name
      permission
    }
  }
`
