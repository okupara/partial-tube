import React from "react"
import { Modal } from "../components/Parts/Modal"
import { PlaylistSelect } from "../components/Parts/PlaylistSelect"

export const SelectPlaylist = () => {
  return <Modal content={() => <PlaylistSelect playlists={[]} />} />
}
