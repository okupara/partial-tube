import React from "react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { Playlist as LayoutPlaylist, PlaylistProps } from "../../layouts/Playlist"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

const query = gql`
  query Playlist($pid: String!) {
    playlist(id: $pid) {
      id
      name
      comment
      numOfVideos
      totalSec
      videos {
        id
        start
        end
        videoId
        title
        comment
      }
    }
  }
`

export const Playlist = (props: Props) => {
  const router = useRouter()
  const { data } = useQuery(query, { variables: { pid: props.id } })
  const playlist: PlaylistProps = data?.playlist
  const { fbAuth } = props

  return (
    <NeedsLogin fbAuth={fbAuth}>
      {playlist ? (
        <LayoutPlaylist
          id={playlist.id}
          videos={playlist.videos}
          title={playlist.title}
          lastUpdate={new Date()}
          numOfVideos={playlist.numOfVideos}
          comment={playlist.comment}
          totalSec={playlist.totalSec}
          onClickPlay={(id) => router.push("/player/[id]", `/player/${id}`)}
        />
      ) : null}
    </NeedsLogin>
  )
}

Playlist.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Playlist))
