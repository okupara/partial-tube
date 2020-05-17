import React from "react"
import { Box, Stack } from "@chakra-ui/core"
import { Playlist } from "../graphql/type-defs.graphqls"
import { PlaylistCard } from "../components/Card/PlaylistCard"
import gql from "graphql-tag"

type Props = {
  onClickCard?: (id: string) => void
  playlists: ReadonlyArray<GQLPlaylist>
}

export const Playlists = (props: Props) => (
  <Box px={6}>
    <Stack spacing={4}>
      {props.playlists.map((el) => (
        <Box key={el.id}>
          <PlaylistCard
            onClickCard={props.onClickCard}
            id={el.id}
            name={el.name}
            comment={el.comment}
            updated={el.created}
            firstVideoId={el.firstVideoId}
            numOfVideos={el.numOfVideos}
          />
        </Box>
      ))}
    </Stack>
  </Box>
)
export const query = gql`
  query {
    playlists {
      id
      comment
      numOfVideos
      name
      firstVideoId
      totalSec
      created
    }
  }
`
type GQLPlaylist = Pick<
  Playlist,
  | "id"
  | "comment"
  | "name"
  | "permission"
  | "totalSec"
  | "numOfVideos"
  | "created"
  | "firstVideoId"
>
export type QueryData = Playlists<GQLPlaylist>
