import React from "react"
import { Box, Button } from "@chakra-ui/core"
import { Modal } from "../components/Parts/Modal"
import { PlaylistSelect } from "../components/Parts/PlaylistSelect"
import { PlaylistOption } from "../components/Parts/PlaylistOption"
import {
  usePlaylistOptions,
  UpdatePlaylistFn,
  GQLPlaylistArray,
} from "./AddPlaylistModalHooks"
import { MiniNewPlaylistForm } from "../components/Parts/MiniNewPlaylistForm"

export type Props = {
  uid: string
  selectedPlaylist: GQLPlaylistArray
  updatePlaylistFn: UpdatePlaylistFn
  isOpen: boolean
  onClose: () => void
}

export const AddPlalystModal = ({
  uid,
  selectedPlaylist,
  updatePlaylistFn,
  isOpen,
  onClose,
}: Props) => {
  const { data, onChange, onAdd } = usePlaylistOptions({
    uid,
    selectedOptions: selectedPlaylist,
    updatePlaylistFn,
  })
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save to..."
      content={() => (
        <>
          <MiniNewPlaylistForm onClickAddPlaylist={onAdd} />
          <Box my={8}>
            <PlaylistSelect>
              {data?.ids.map((id) => (
                <Box key={id}>
                  <PlaylistOption onChange={onChange} {...data.body[id]} />
                </Box>
              ))}
            </PlaylistSelect>
          </Box>
        </>
      )}
      footer={() => <Button onClick={onClose}>close</Button>}
    />
  )
}

// TODO: Check if this useCallback improve performance
// const Content = (
//   data: NormalizedPlaylists | null,
//   onAddToPlaylist: Props["onAddToPlaylist"],
// ) =>
//   React.useCallback(
//     () =>
//       data ? (
//         <PlaylistSelect>
//           {data.ids.map((id) => (
//             <Box key={id}>
//               <PlaylistOption
//                 onChange={(p, action) => onAddToPlaylist(p, action)}
//                 {...data.body[id]}
//               />
//             </Box>
//           ))}
//         </PlaylistSelect>
//       ) : null,
//     [data],
//   )
