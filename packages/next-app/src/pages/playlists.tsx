import { withAuth } from "../compositions/withAuth"
import { withApollo } from "../compositions/withApollo"
import { NeedsLogin } from "../containers/NeedsLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { Playlists, query, QueryData } from "../layouts/Playlists"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  fbAuth: HooksReturnType
}

const Component = (props: Props) => {
  const router = useRouter()
  // useQuery from any not page components seeems fails ssr and send requests to /graqphql...
  // maybe this is similar problem https://github.com/apollographql/react-apollo/issues/3500
  const { data, error } = useQuery<QueryData>(query)
  console.log(error)

  return (
    <NeedsLogin currentMenu="playlists" fbAuth={props.fbAuth}>
      {data && (
        <Playlists
          playlists={data.playlists}
          onClickCard={(id) => router.push("/playlist/[id]", `/playlist/${id}`)}
        />
      )}
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Component))
