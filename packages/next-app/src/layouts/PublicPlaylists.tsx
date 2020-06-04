import React from "react"
import { Box, Stack } from "@chakra-ui/core"
import { Playlist } from "../graphql/type-defs.graphqls"
import { PlaylistItem } from "../components/playlists/PlaylistItem"
import gql from "graphql-tag"
import { Card } from "../../src/components/shared/Card"

type Props = {
  onClickCard?: (id: string) => void
  onClickPlay?: (id: string) => void
  playlists: ReadonlyArray<GQLPlaylist>
}

export const PublicPlaylists = (props: Props) => {
  return (
    <Box px={6}>
      <Stack spacing={4}>
        {props.playlists.map((el) => (
          <Box key={el.id}>
            <Card onClick={() => props.onClickCard?.(el.id)}>
              <PlaylistItem
                id={el.id}
                name={el.name}
                comment={el.comment}
                updated={el.created}
                firstVideoId={el.firstVideoId}
                numOfVideos={el.numOfVideos}
              />
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export const query = gql`
  query {
    publicPlaylists {
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
export type GQLPlaylist = Pick<
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
export type QueryData = QueryPlaylists<GQLPlaylist>
