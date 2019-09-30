import { ApolloError } from 'apollo-server-cloud-functions'
import { InvalidTokenError as InvalidTokenDomainError } from '@partial-tube/domain/lib/Errors'

class InvalidTokenError extends ApolloError {
  constructor() {
    super(
      'You put a invalid token or expired token, please login again',
      InvalidTokenDomainError.tag
    )
  }
}

export { InvalidTokenError }
