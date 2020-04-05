import React from "react"
import { StackList } from "../components/List/StackList"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
import { Box } from "@chakra-ui/core"
import {
  PlaylistCard,
  Props as PlaylistProps,
} from "../components/Card/PlaylistCard"

type Props = {
  onClickCard?: (id: string) => void
  playlists: ReadonlyArray<PlaylistProps>
}

export const Playlists = (props: Props) => {
  const userContext = useLoginUser()
  if (!userContext.user) throw new Error("Unexpectedly, user is null")
  return (
    <Authenticated user={userContext.user}>
      <Box mt={24} px={6}>
        <StackList
          list={props.playlists}
          component={(p) => <PlaylistCard onClickCard={props.onClickCard} {...p} />}
        />
      </Box>
    </Authenticated>
  )
  return
}
