import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export const query = gql`
  mutation AddVideo($input: User!) {
    addVideo(input: $input) {
      id
    }
  }
`
const useAddVideoForm = () => {
  const res = useMutation(query)
  return {
    dispatcher: res[0],
    result: res[1]
  }
}

export default useAddVideoForm
