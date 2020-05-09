import React from "react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { Playlist as LayoutPlaylist } from "../../layouts/Playlist"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

export const Playlist = (props: Props) => {
  const router = useRouter()
  const { fbAuth } = props

  return (
    <NeedsLogin fbAuth={fbAuth}>
      <LayoutPlaylist
        playlistId={props.id}
        onPlay={(id) => router.push("/player/[id]", `/player/${id}`)}
      />
    </NeedsLogin>
  )
}

Playlist.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Playlist))
