import * as React from "react"
import { NextPageContext } from "next"
import { Box } from "@chakra-ui/core"
import {
  Player as PlayerLayout,
  query,
  GQLPlaylist,
} from "../../layouts/PartialVideoPlayer"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { NoNeedLogin } from "../../containers/NoNeedLogin"
import { ContentBox } from "../../components/shared/ContentBox"
import { ErrorScreen } from "../../components/shared/ErrorScreen"

import { useQueryWithAuth } from "../../hooks/useQueryWithAuth"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

const Player = ({ id, fbAuth }: Props) => {
  const { loading, error, data } = useQueryWithAuth<QueryPlaylist<GQLPlaylist>>({
    query,
    id,
    user: fbAuth.user,
  })

  return (
    <NoNeedLogin fbAuth={fbAuth}>
      {loading && <div>loading</div>}
      {error && (
        <ContentBox>
          <Box p={10}>
            <ErrorScreen title={error.graphQLErrors.map((t) => t.message)} />
          </Box>
        </ContentBox>
      )}
      {!error && !loading && data && (
        <Box>
          && <PlayerLayout playlist={data.playlist} />
        </Box>
      )}
    </NoNeedLogin>
  )
}

Player.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Player))
