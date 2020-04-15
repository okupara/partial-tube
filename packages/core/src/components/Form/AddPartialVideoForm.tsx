import React from "react"
import { Flex, Box, Button, Textarea } from "@chakra-ui/core"
import { VideoTimeField } from "./VideoTimeField"
import { SelectedPlaylistTags } from "../Parts/SelctedPlaylistTags"
import { AddPlalystModal } from "../../containers/AddPlaylistModal"
import { useLoginUser } from "../../contexts/LoginUser"

type Props = {
  currentTime: number
  onAdd?: () => void
}

type NullableNumber = null | number

const useFormState = () => {
  const [start, setStart] = React.useState<NullableNumber>(null)
  const [end, setEnd] = React.useState<NullableNumber>(null)
  const [comment, setComment] = React.useState("")
  return {
    start,
    end,
    comment,
    setStart: (start: number) => setStart(start),
    setEnd: (end: number) => setEnd(end),
    setComment: React.useCallback(
      (e: React.FormEvent<HTMLInputElement>) => setComment(e.currentTarget.value),
      [],
    ),
  }
}

export const useAddPartialVideoForm = () => {
  const [selectedPlaylists, setSelectedPlaylist] = React.useState<
    ReadonlyArray<GQLPlaylist>
  >([])

  const updateRecord = (record: GQLPlaylist, action: "add" | "delete") => {
    if (action === "add") {
      setSelectedPlaylist([...selectedPlaylists, record])
    } else {
      setSelectedPlaylist(selectedPlaylists.filter((s) => s.id !== record.id))
    }
  }

  const onClickDelete = (id: string) => {
    const record = selectedPlaylists.find((el) => el.id === id)
    if (record) {
      updateRecord(record, "delete")
    }
  }

  return {
    selectedPlaylists,
    updateRecord,
    onClickDelete,
  }
}

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return {
    isOpen,
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
  }
}

export const AddPartialVideoForm = ({ onAdd, currentTime }: Props) => {
  const inpuState = useFormState()
  const modal = useModal()
  console.log(modal)
  const { selectedPlaylists, onClickDelete, updateRecord } = useAddPartialVideoForm()
  const userContext = useLoginUser()

  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null")
  }

  const createTagFn = React.useCallback(
    (el: GQLPlaylist) => ({
      key: el.id,
      title: el.name,
    }),
    [],
  )

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        <Box>
          <VideoTimeField
            title="start"
            currentTime={currentTime}
            selectedSec={inpuState.start}
            onTimeSet={() => inpuState.setStart(currentTime)}
          />
        </Box>
        <Box ml={4}>
          <VideoTimeField
            title="end"
            currentTime={currentTime}
            selectedSec={inpuState.end}
            onTimeSet={() => inpuState.setEnd(currentTime)}
          />
        </Box>
        <Box ml="auto">
          <Button>PREVIEW</Button>
        </Box>
      </Flex>
      <Flex mt={5}>
        <Box lineHeight={2}>Playlists:</Box>
        <Flex>
          {selectedPlaylists.length > 0 ? (
            <Box ml={4}>
              <SelectedPlaylistTags
                list={selectedPlaylists}
                createTagFn={createTagFn}
                onClickDelete={onClickDelete}
              />
            </Box>
          ) : null}
          <Box ml={4}>
            <AddPlalystModal
              isOpen={modal.isOpen}
              onClose={modal.close}
              selectedPlaylist={selectedPlaylists}
              updatePlaylistFn={updateRecord}
              uid={userContext.user.id}
            />
            <Button onClick={modal.open} size="sm" variant="ghost">
              choose...
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Box mt={5}>
        <Textarea
          value={inpuState.comment}
          onChange={inpuState.setComment}
          height={10}
          placeholder="put some comments..."
        />
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Button onClick={onAdd}>ADD</Button>
      </Flex>
    </Flex>
  )
}
