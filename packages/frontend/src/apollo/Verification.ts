import { ApolloLink, fromError } from 'apollo-link'
import * as Errors from './Errors'

export default new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return fromError(Errors.createGQLNoStoredTokenError())
  }
  return forward ? forward(operation) : null
})
