import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { NeedsLogin } from "../containers/NeedsLogin"
import { withAuth } from "../compositions/withAuth"
import { Videos as LayoutVideos } from "../layouts/Videos"
import { withApollo } from "../compositions/withApollo"

type Props = {
  fbAuth: HooksReturnType
}

const Videos = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <LayoutVideos />
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Videos))
