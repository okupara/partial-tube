import { NextPageContext } from "next"
import { Box } from "@chakra-ui/core"
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
      <Box>
        <PlayerLayout playlistId={props.id} />
      </Box>
    </NeedsLogin>
  )
}

Player.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Player))
