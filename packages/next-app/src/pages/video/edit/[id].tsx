import { useQuery } from "@apollo/react-hooks"
import { withAuth } from "../../../compositions/withAuth"
import { withApollo } from "../../../compositions/withApollo"
import { NeedsLogin } from "../../../containers/NeedsLogin"
import { HooksReturnType } from "../../../hooks/useFirebaseAuth"
import { EditVideo, query, GQLVideo } from "../../../layouts/EditVideo"
import { NextPageContext } from "next"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

const Edit = ({ id, fbAuth }: Props) => {
  const { data } = useQuery<QueryVideo<GQLVideo>>(query, { variables: { id } })
  return (
    <NeedsLogin fbAuth={fbAuth}>
      {data && <EditVideo video={data.video} id={id} />}
    </NeedsLogin>
  )
}

Edit.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Edit))
