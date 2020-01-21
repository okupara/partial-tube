import useFirebaseAuth from 'hooks/useFirebaseAuth'
import { useMutation } from '@apollo/react-hooks'
import * as A from '@partial-tube/domain/lib/Auth/index'
import * as AS from '@partial-tube/domain/lib/ApolloState'
import gql from 'graphql-tag'

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
  // TODO: check if useEffect in "resFirebase" happens when useMutation's state updates
  // because resFirebase's state is an object
  const resFirebase = useFirebaseAuth()
  const [dispatcher, result] = useMutation(query)
  const state = AS.toState({
    waiting: result.loading,
    data: result.data,
    error: result.error
  })

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
