import React from "react"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
import { Box, Stack } from "@chakra-ui/core"
import { Playlist } from "../graphql/type-defs.graphqls"
import { PlaylistCard } from "../components/Card/PlaylistCard"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  onClickCard?: (id: string) => void
}

export const Playlists = (props: Props) => {
  const userContext = useLoginUser()
  const { data } = useQuery<QueryData>(query)

  if (!userContext.user) throw new Error("Unexpectedly, user is null")
  return (
    <Authenticated user={userContext.user}>
      <Box mt={24} px={6}>
        {data && (
          <Stack spacing={4}>
            {data.playlists.map((el) => (
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
        )}
      </Box>
    </Authenticated>
  )
}

const query = gql`
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
type QueryData = Playlists<GQLPlaylist>
