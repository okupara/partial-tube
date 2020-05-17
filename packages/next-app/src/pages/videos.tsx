import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { useRouter } from "next/router"
import { NeedsLogin } from "../containers/NeedsLogin"
import { withAuth } from "../compositions/withAuth"
import { Videos as LayoutVideos, query, GQLVideo } from "../layouts/Videos"
import { withApollo } from "../compositions/withApollo"
import { useQuery } from "@apollo/react-hooks"

type Props = {
  fbAuth: HooksReturnType
}

const Videos = (props: Props) => {
  const router = useRouter()
  const { data } = useQuery<QueryVideos<GQLVideo>>(query)

  return (
    <NeedsLogin currentMenu="videos" fbAuth={props.fbAuth}>
      {data && (
        <LayoutVideos
          videos={data.videos}
          onClickEditMenu={(id) =>
            router.push("/video/edit/[id]", `/video/edit/${id}`)
          }
        />
      )}
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Videos))
