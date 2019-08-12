import { onError } from 'apollo-link-error'

// import { GraphQLError } from 'graphql/error'

export default onError(({ response, graphQLErrors, networkError }) => {
  console.log('G:', graphQLErrors)
  console.log('N:', networkError)
  console.log('R', response)
})
