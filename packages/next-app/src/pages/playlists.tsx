import { withAuth } from "../compositions/withAuth"
import { withApollo } from "../compositions/withApollo"
import { NeedsLogin } from "../containers/NeedsLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { Playlists } from "../layouts/Playlists"
import { useRouter } from "next/router"

type Props = {
  fbAuth: HooksReturnType
}

const Component = (props: Props) => {
  const router = useRouter()
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <Playlists
        onClickCard={(id) => router.push("/playlist/[id]", `/playlist/${id}`)}
      />
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Component))
