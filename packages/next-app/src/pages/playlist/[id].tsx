import * as React from "react"
import { useRouter } from "next/router"
import { Box } from "@chakra-ui/core"
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
import { ErrorScreen } from "../../components/shared/ErrorScreen"
import { useQueryWithAuth } from "../../hooks/useQueryWithAuth"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

export const Playlist = ({ id, fbAuth }: Props) => {
  const router = useRouter()
  const { data, loading, error } = useQueryWithAuth<QueryPlaylist<GQLPlaylist>>({
    query,
    id,
    user: fbAuth.user,
  })

  return (
    <NoNeedLogin fbAuth={fbAuth}>
      <ContentBox>
        {error && (
          <Box p={10}>
            <ErrorScreen title={error.graphQLErrors.map((error) => error.message)} />
          </Box>
        )}
        {!loading && !error && data && (
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
