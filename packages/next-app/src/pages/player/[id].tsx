import { NextPageContext } from "next"
import { Player as PlayerLayout } from "../../layouts/PartialVideoPlayer"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

const Player = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <PlayerLayout playlistId={props.id} />
    </NeedsLogin>
  )
}

Player.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Player))
