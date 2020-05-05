import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { NeedsLogin } from "../containers/NeedsLogin"
import { withAuth } from "../compositions/withAuth"
import { initFirebase } from "../utils/initFirebase"
import firebase from "firebase"
import { NextPageContext } from "next"
import { addSession } from "../middlewares/addSession"
import { Videos } from "../layouts/Videos"

type Props = {
  fbAuth: HooksReturnType
  data: any // TODO: improve type definition later.
}

const Videos = (props: Props) => {
  return (
    <NeedsLogin fbAuth={props.fbAuth}>
      <div style={{ marginTop: 120 }}>test</div>
    </NeedsLogin>
  )
}

Videos.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx
  addSession(req, res)
  const actualReq = (req as unknown) as RequestWithSession
  const authUser = actualReq.session?.user // why does user become "any"??
  if (!authUser) {
    return {}
  }
  console.log("AUTHUSER", authUser)
  initFirebase()
  const db = firebase.firestore()
  const snapshots = await db
    .collection("videos")
    .where("uid", "==", authUser.id)
    .get()
  const result = snapshots.docs.map((elem) => elem.data())
  console.log(result)
  return {
    data: result,
  }
}

export default withAuth(Videos)
