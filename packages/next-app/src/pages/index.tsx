import { withAuth } from "../compositions/withAuth"
import { withApollo } from "../compositions/withApollo"
import { NeedsLogin } from "../containers/NeedsLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

type Props = {
  fbAuth: HooksReturnType
}

const query = gql`
  query Playlist($pid: String!) {
    playlist(id: $pid) {
      id
      name
    }
  }
`

const Index = (props: Props) => {
  const { loading, data, error } = useQuery(query, {
    variables: { pid: "ih47t2IiBb7xmxAQ8JMs" },
  })
  if (data) {
    console.log("SUCCESS", data)
  }

  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      {loading && <div>loading</div>}
      {data && <div style={{ marginTop: "220px" }}>are?????</div>}
      {error && <div>error</div>}
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Index))
