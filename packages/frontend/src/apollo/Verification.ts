import { ApolloLink, fromError } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { Token } from 'apollo/Resolvers'

export default new ApolloLink((operation, forward) => {
  const cache: InMemoryCache = operation.getContext().cache
  const res = cache.readQuery<Token>({
    query: gql`
      query {
        token @client
      }
    `
  })
  if (!res) {
    return fromError(new Error("Couldn't find your token"))
  }
  // because rest-link sends token and then youtube api check it and responds 401...
  // TODO: find more cleaner way.
  if (operation.operationName !== 'VideoExsitance') {
    operation.setContext({ headers: { authorization: `Bearer ${res.token}` } })
  }
  return forward ? forward(operation) : null
})
