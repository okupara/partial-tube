import React from "react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { Playlist as LayoutPlaylist } from "../../layouts/Playlist"
import { NoNeedLogin } from "../../containers/NoNeedLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { ContentBox } from "../../components/shared/ContentBox"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

export const Playlist = (props: Props) => {
  const router = useRouter()
  const { fbAuth } = props

  return (
    <NoNeedLogin fbAuth={fbAuth}>
      <ContentBox>
        <LayoutPlaylist
          playlistId={props.id}
          onPlay={(id) => router.push("/player/[id]", `/player/${id}`)}
        />
      </ContentBox>
    </NoNeedLogin>
  )
}

Playlist.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Playlist))
