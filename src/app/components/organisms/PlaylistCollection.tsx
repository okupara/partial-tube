import React from "react"
import StackList from "../atoms/StackList"
import PlaylistCard, { Props as PLProps } from "../molecules/PlaylistCard"

type Props = {
  playlistCollection: ReadonlyArray<PLProps>
}

const PlaylistCollection: React.FC<Props> = props => (
  <StackList
    list={props.playlistCollection}
    component={p => <PlaylistCard {...p} />}
  />
)

export default PlaylistCollection
