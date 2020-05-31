import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { useRouter } from "next/router"
import { NoNeedLogin } from "../containers/NoNeedLogin"
import { withAuth } from "../compositions/withAuth"
import { PublicPlaylists, GQLPlaylist, query } from "../layouts/PublicPlaylists"
import { withApollo } from "../compositions/withApollo"
import { useQuery } from "@apollo/react-hooks"
import { ContentBox } from "../components/shared/ContentBox"

type Props = {
  fbAuth: HooksReturnType
}

const Videos = (props: Props) => {
  const router = useRouter()
  const { data } = useQuery<QueryPublic<GQLPlaylist>>(query, {
    fetchPolicy: "cache-and-network",
  })

  return (
    <NoNeedLogin currentMenu="public videos" fbAuth={props.fbAuth}>
      <ContentBox>
        {data && (
          <PublicPlaylists
            playlists={data.publicPlaylists}
            onClickCard={(id) => router.push("/playlist/[id]", `/playlist/${id}`)}
          />
        )}
      </ContentBox>
    </NoNeedLogin>
  )
}

export default withApollo(withAuth(Videos))
