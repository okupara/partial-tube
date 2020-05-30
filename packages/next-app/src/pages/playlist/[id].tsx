import React from "react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import {
  Playlist as LayoutPlaylist,
  query,
  GQLPlaylist,
} from "../../layouts/Playlist"
import { NoNeedLogin } from "../../containers/NoNeedLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { ContentBox } from "../../components/shared/ContentBox"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

export const Playlist = ({ id, fbAuth }: Props) => {
  const router = useRouter()
  const { data } = useQuery<QueryPlaylist<GQLPlaylist>>(query, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  })

  return (
    <NoNeedLogin fbAuth={fbAuth}>
      <ContentBox>
        {data && (
          <LayoutPlaylist
            playlist={data.playlist}
            onPlay={(id) => router.push("/player/[id]", `/player/${id}`)}
          />
        )}
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
