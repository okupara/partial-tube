import * as React from "react"
import { Flex, Box, Button } from "@chakra-ui/core"
import { SelectedPlaylistTags } from "../Parts/SelctedPlaylistTags"
import { Modal } from "../Parts/Modal"
import { useIsOpen } from "../../hooks/useIsOpen"
import { MiniPlaylistForm } from "../Parts/MiniPlaylistForm"
import { PlaylistsSelector } from "../Parts/PlaylistsSelector"

const Component = () => {
  const openState = useIsOpen()
  return (
    <Flex mt={5} alignItems="center">
      <Box lineHeight={2} mr={2}>
        Playlists:
      </Box>
      <Box>
        <SelectedPlaylistTags />
      </Box>
      <Box>
        <Button onClick={openState.open} size="sm" variant="ghost">
          choose...
        </Button>
      </Box>
      <Modal
        isOpen={openState.isOpen}
        onClose={openState.close}
        title="Save to..."
        content={() => (
          <>
            <MiniPlaylistForm />
            <Box mt={6}>
              <PlaylistsSelector uid="aaaa" />
            </Box>
          </>
        )}
        footer={() => <Button onClick={openState.close}>close</Button>}
      />
    </Flex>
  )
}

export const SelectedPlaylistsFormControl = React.memo(Component)
