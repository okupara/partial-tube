import useFirebaseAuth from 'hooks/useFirebaseAuth'
import { useMutation } from '@apollo/react-hooks'
import * as A from '@partial-tube/domain/lib/Auth/index'
import gql from 'graphql-tag'
import { useStateMutation } from 'hooks/useApolloState'

export const query = gql`
  mutation SaveUserInfo($user: User!, $token: String!) {
    saveUser(user: $user) @client
    saveToken(token: $token) @client
  }
`

type Props = {
  waiting: () => JSX.Element
  failed: () => JSX.Element
  success: () => JSX.Element
}

const Auth = (props: Props) => {
  const resFirebase = useFirebaseAuth()
  const mu = useMutation(query)
  const { state, dispatcher } = useStateMutation(mu)
  const authState = A.createState(resFirebase.state, state)
  if (A.isReadyToSave(authState)) {
    const data = authState.right.value
    dispatcher({
      variables: {
        user: {
          ...data.user,
          userId: data.user.userId.value
        },
        token: data.token.value
      }
    })
  }
  return A.match(authState, {
    waiting: () => props.waiting(),
    failed: () => props.failed(),
    success: () => props.success()
  })
}

export default Auth
