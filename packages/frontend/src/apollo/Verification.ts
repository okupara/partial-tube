import { ApolloLink } from 'apollo-link'
import { getToken } from 'utils/LocalStorage'

// import * as Errors from './Errors'

export default new ApolloLink((operation, forward) => {
  const token = getToken()
  // if (!token) {
  //   return fromError(Errors.createGQLNoStoredTokenError())
  // }
  operation.setContext({ headers: { authorization: `Bearer ${token}` } })

  return forward ? forward(operation) : null
})
