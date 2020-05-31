// import { useRouter } from "next/router"
import { Text } from "@chakra-ui/core"
import { withAuth } from "../compositions/withAuth"
import { NoNeedLogin } from "../containers/NoNeedLogin"
import { HooksReturnType } from "../hooks/useFirebaseAuth"
import { ContentBox } from "../components/shared/ContentBox"

type Props = {
  fbAuth: HooksReturnType
}

const About = ({ fbAuth }: Props) => {
  //   const router = useRouter()

  return (
    <NoNeedLogin currentMenu="about" fbAuth={fbAuth}>
      <ContentBox>
        <Text size="lg">This is another YouTube playlist.</Text>
      </ContentBox>
    </NoNeedLogin>
  )
}

export default withAuth(About)
