import { GraphQLError } from 'graphql'
import { ErrorTypes } from '@partial-tube/domain/lib/Auth'

export type ErrorCommand = {
  networkError: {
    message: string
    result?: {
      errors: GraphQLError[]
    }
  }
}

export const isFirst = (error: ErrorCommand, tag: ErrorTypes['tag']) => {
  if (
    error.networkError.result &&
    error.networkError.result &&
    error.networkError.result.errors.length > 0 &&
    error.networkError.result.errors[0].extensions &&
    error.networkError.result.errors[0].extensions.code === tag
  ) {
    return true
  }
  return false
}
