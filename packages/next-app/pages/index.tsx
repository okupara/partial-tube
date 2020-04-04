// import { AppTest } from "../containers/AppTest"
import { withAuth } from "../compositions/withAuth"
// import { useLoginUser } from "@partial-tube/core/lib/contexts/LoginUser"
const Index = () => {
  return <div>hello</div>
}

export default withAuth(Index)
