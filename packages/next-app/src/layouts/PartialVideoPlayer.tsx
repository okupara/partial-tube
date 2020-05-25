import React from "react"
import { Flex, Box, Text } from "@chakra-ui/core"
import { PlayerController } from "../components/player/PlayerController"
import { DescriptionBox } from "../components/shared/DescriptionBox"
import { YoutubePlayer, VideoProps } from "../components/shared/YoutubePlayer"
import { Authenticated } from "../components/auth/Authenticated"
import { useLoginUser } from "../contexts/LoginUser"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { PartialVideo as GQLDefVideo } from "../graphql/type-defs.graphqls"
import { FooterListFrame } from "../components/player/FooterListFrame"
import { TinyVideoCard, Props as TCProps } from "../components/player/TinyVideoCard"

console.warn("[TODO] Reconsider this type definition")
export type ListProps = ReadonlyArray<
  TCProps & Pick<VideoProps, "id"> & { title: string }
>

type Props = {
  playlistId: string
}

export const usePlayerQueue = (playlistId: string) => {
  const [limit, setLimit] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const changeCurrent = (fn: (current: number) => number) => setCurrentIndex(fn)
  const { data, loading, error } = useQuery<Playlist<GQLPlaylist>>(query, {
    variables: { id: playlistId },
  })

  React.useEffect(() => {
    if (data) {
      setLimit(data.playlist.videos.length)
    }
  }, [data])

  return {
    currentIndex,
    next() {
      if (currentIndex >= limit - 1) return
      changeCurrent((current) => current + 1)
    },
    prev() {
      if (currentIndex === 0) return
      changeCurrent((current) => current - 1)
    },
    setLimit,
    loading,
    data,
    error,
  }
}

export const Player: React.FC<Props> = (props) => {
  const res = usePlayerQueue(props.playlistId)

  const userContext = useLoginUser()
  if (!userContext.user) {
    throw new Error("Unexpectedly, user is null")
  }

  if (!res.data) return null // or show users something to notice waiting for data

  const currentVideo = res.data.playlist.videos[res.currentIndex]

  return (
    <Authenticated user={userContext.user}>
      <Flex
        pt={24}
        flexDirection="column"
        height="100%"
        minHeight="100vh"
        position="relative"
        boxSizing="border-box"
        pb="170px"
      >
        <Box height="360px" m="0 auto">
          <YoutubePlayer
            id={currentVideo.id}
            videoId={currentVideo.videoId}
            start={currentVideo.start}
            end={currentVideo.end}
            onEnd={() => res.next()}
          />
        </Box>
        <Box pt={1} pl={2}>
          <Text as="h2" fontWeight="bold" fontSize="xl">
            {currentVideo.title}
          </Text>
        </Box>
        <Flex pt={3} flexDirection="column">
          <Box px={3}>
            <PlayerController />
          </Box>
          <Box px={4} pt={4}>
            <DescriptionBox text={currentVideo.comment ?? ""} />
          </Box>
        </Flex>
        <Box position="absolute" bottom={0} width="100%">
          <FooterListFrame
            list={res.data.playlist.videos}
            titleView={() => (
              <Text fontSize="sm" fontWeight="bold">
                Video List
              </Text>
            )}
            elementView={(pv) => (
              <TinyVideoCard
                videoId={pv.videoId}
                comment={pv.comment}
                start={pv.start}
                end={pv.end}
                playing={pv.id === currentVideo.id}
              />
            )}
          />
        </Box>
      </Flex>
    </Authenticated>
  )
}

const query = gql`
  query Playlist($id: String!) {
    playlist(id: $id) {
      videos {
        id
        videoId
        title
        comment
        start
        end
      }
    }
  }
`

export default Player

type GQLVideo = Pick<
  GQLDefVideo,
  "id" | "videoId" | "title" | "comment" | "start" | "end"
>
type GQLPlaylist = { videos: ReadonlyArray<GQLVideo> }
