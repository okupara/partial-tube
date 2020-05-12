import { withAuth } from "../../compositions/withAuth"
import { withApollo } from "../../compositions/withApollo"
import { NeedsLogin } from "../../containers/NeedsLogin"
import { HooksReturnType } from "../../hooks/useFirebaseAuth"
import { AddVideo } from "../../layouts/AddVideo"

type Props = {
  fbAuth: HooksReturnType
}

const Add = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <AddVideo />
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Add))
