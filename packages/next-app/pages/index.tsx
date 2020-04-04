import { withAuth } from "../compositions/withAuth"
import { NeedsLogin } from "../containers/NeedsLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
// import * as User from "@partial-tube/core/lib/models/User"

type Props = {
  fbAuth: HooksReturnType
  a: number
}

const Index = (props: Props) => {
  console.log("FBAUth", props)
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <div>are?????{props.a}</div>
    </NeedsLogin>
  )
}

Index.getInitialProps = () => {
  console.log("KKJKJK", typeof window === "undefined")
  console.log("INDEX SSR!!!!!")
  return { a: 1 }
}

export default withAuth(Index)
