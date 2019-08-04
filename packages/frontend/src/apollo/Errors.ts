import { GraphQLError } from 'graphql/error'
import {
  PTError,
  createNoStoredTokenError
} from '@partial-tube/domain/lib/Errors'

interface PTGraphQLError extends GraphQLError {
  extensions: { code: string }
}

export const withGQLError = (error: PTError): PTGraphQLError => {
  const gqError = new GraphQLError(
    error.message,
    undefined,
    null,
    null,
    null,
    null,
    { code: error.code }
  )
  return gqError as PTGraphQLError
}

export const createGQLNoStoredTokenError = () =>
  withGQLError(createNoStoredTokenError())
