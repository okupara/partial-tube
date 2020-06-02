import { useQuery } from "@apollo/react-hooks"
import { withAuth } from "../../../compositions/withAuth"
import { withApollo } from "../../../compositions/withApollo"
import { NeedsLogin } from "../../../containers/NeedsLogin"
import { HooksReturnType } from "../../../hooks/useFirebaseAuth"
import { EditVideo, query, GQLVideo } from "../../../layouts/EditVideo"
import { NextPageContext } from "next"
import { ContentBox } from "../../../components/shared/ContentBox"

type Props = {
  id: string
  fbAuth: HooksReturnType
}

const Edit = ({ id, fbAuth }: Props) => {
  const { data } = useQuery<QueryVideo<GQLVideo>>(query, {
    variables: { id },
    fetchPolicy: "network-only",
  })
  return (
    <NeedsLogin fbAuth={fbAuth}>
      <ContentBox>{data && <EditVideo video={data.video} id={id} />}</ContentBox>
    </NeedsLogin>
  )
}

Edit.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  }
}

export default withApollo(withAuth(Edit))
