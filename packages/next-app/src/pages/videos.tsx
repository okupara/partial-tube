import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { useRouter } from "next/router"
import { NeedsLogin } from "../containers/NeedsLogin"
import { withAuth } from "../compositions/withAuth"
import { Videos as LayoutVideos, query, GQLVideo } from "../layouts/Videos"
import { withApollo } from "../compositions/withApollo"
import { useQuery } from "@apollo/react-hooks"
import { ContentBox } from "../components/shared/ContentBox"

type Props = {
  fbAuth: HooksReturnType
}

const Videos = (props: Props) => {
  const router = useRouter()
  const { data } = useQuery<QueryVideos<GQLVideo>>(query, {
    fetchPolicy: "cache-and-network",
  })

  return (
    <NeedsLogin currentMenu="videos" fbAuth={props.fbAuth}>
      <ContentBox>
        {data && (
          <LayoutVideos
            videos={data.videos}
            onClickEditMenu={(id) =>
              router.push("/video/edit/[id]", `/video/edit/${id}`)
            }
          />
        )}
      </ContentBox>
    </NeedsLogin>
  )
}

export default withApollo(withAuth(Videos))
