import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { AddVideo } from "../../layouts/AddVideo"
import { ContentBox } from "../../components/shared/ContentBox"

type Props = {
  fbAuth: HooksReturnType
}

const Add = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <ContentBox>
        <AddVideo />
      </ContentBox>
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Add))
