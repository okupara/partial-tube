import { ApolloLink } from 'apollo-link'
import { getToken } from 'utils/LocalStorage'

// import * as Errors from './Errors'

export default new ApolloLink((operation, forward) => {
  const token = getToken()
  // if (!token) {
  //   return fromError(Errors.createGQLNoStoredTokenError())
  // }
  // because rest-link sends token and then youtube api check it and responds 401...
  // TODO: find more cleaner way.
  if (operation.operationName !== 'VideoExsitance') {
    operation.setContext({ headers: { authorization: `Bearer ${token}` } })
  }
  return forward ? forward(operation) : null
})
