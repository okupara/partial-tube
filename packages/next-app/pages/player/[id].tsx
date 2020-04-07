import { NextPageContext } from "next"
import {
  ListProps,
  Player as PlayerLayout,
} from "@partial-tube/core/lib/layouts/PartialVideoPlayer"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { NeedsLogin } from "../../containers/NeedsLogin"
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

const Player = (props: Props) => {
  const { data } = useQuery(query, { variables: { pid: props.id } })
  console.log("DATA-------", data)
  const videos: ListProps = data?.playlist?.videos
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      {videos ? <PlayerLayout partialVideoList={videos} /> : null}
    </NeedsLogin>
  )
}

Player.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Player))
