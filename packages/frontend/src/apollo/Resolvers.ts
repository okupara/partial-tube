import { InMemoryCache } from 'apollo-cache-inmemory'

export const resolvers = {
  Mutation: {
    saveUser: (_: any, varialbles: any, context: any) => {
      const cache: InMemoryCache = context.cache
      cache.writeData({ data: { user: {...varialbles.user, __typename: "LoginUser"} } })
      return null
    },
    saveToken: (_: any, variables: any, context: any) => {
      const cache: InMemoryCache = context.cache
      cache.writeData({ data: { token: variables.token } })
      return null
    }
  }
}
export const initialData = {
  data: {
    user: null,
    token: null
  }
}
