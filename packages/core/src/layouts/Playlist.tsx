import React from "react"
import { StackList } from "../components/List/StackList"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
import { Box, Flex } from "@chakra-ui/core"
import {
  PartialVideoCard,
  Props as PartialVideoProps,
} from "../components/Card/PartialVideoCard"
import {
  PlaylistHeader,
  Props as HeaderProps,
} from "../components/Parts/PlaylistHeader"

type Props = {
  onClickCard?: (id: string) => void
  onClickPlay?: (id: string) => void
  onPlay?: (playlistId: string) => void
  videos: ReadonlyArray<PartialVideoProps>
} & HeaderProps

export type PlaylistProps = Pick<Props, "videos"> & Omit<HeaderProps, "onClickPlay">

export const Playlist = (props: Props) => {
  const userContext = useLoginUser()
  if (!userContext.user) throw new Error("Unexpectedly, user is null")

  return (
    <Authenticated user={userContext.user}>
      <Flex flexDirection="column" mt={24} px={6}>
        <Box>
          <PlaylistHeader
            id={props.id}
            title={props.title}
            totalSec={props.totalSec}
            lastUpdate={props.lastUpdate}
            comment={props.comment}
            numOfVideos={props.numOfVideos}
            onClickPlay={props.onClickPlay}
          />
        </Box>
        <Box mt={6}>
          <StackList
            list={props.videos}
            component={(p) => (
              <PartialVideoCard onClickCard={props.onClickCard} {...p} />
            )}
          />
        </Box>
      </Flex>
    </Authenticated>
  )
}
