import React from "react"
import { SelectedPlaylistTags } from "../../src/components/Parts/SelctedPlaylistTags"
import { playlistOptions } from "../../__mocks__/PlaylistOptions"
import { MarginDecorator } from "../Decorators"

export const selectedPlaylistTags = () => (
  <SelectedPlaylistTags
    list={playlistOptions}
    createTagFn={(el) => ({ key: el.id, title: el.name })}
    onClickDelete={(id) => {
      console.log(id)
    }}
  />
)

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
