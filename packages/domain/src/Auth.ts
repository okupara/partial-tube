import { Either, left, right } from 'fp-ts/lib/Either'
import * as User from './User'
import * as State from './State'

export const enum ErrorTags {
  InvalidTokenError = 'InvalidTokenError'
}

export interface Token {
  value: string
}

export interface InvalidTokenError {
  tag: ErrorTags.InvalidTokenError
}

export type Error = InvalidTokenError
export type Result = Either<Error, User.Record>
export type State = State.Type<Error, User.Record>

export const createToken = (
  tokenStr: String | null
): Either<InvalidTokenError, Token> => {
  if (!tokenStr || tokenStr.length < 10) {
    return left(createInvalidTokenError())
  }
  return right({ value: tokenStr } as Token)
}

export const createInvalidTokenError = (): InvalidTokenError => ({
  tag: ErrorTags.InvalidTokenError
})

export const retrieveToken = (
  getTokenFunc: () => string | null
): Either<InvalidTokenError, Token> => {
  const tokenStr = getTokenFunc()
  return createToken(tokenStr)
}

interface CasesFunctions<J> {
  Verifying?: () => J
  Rejected?: (error: Error) => J
  Authed?: (result: User.Record) => J
}
export const processAuthState = <J>(
  s: State.Type<Error, User.Record>,
  cases: CasesFunctions<J>
): J | null => {
  switch (s.tag) {
    case State.Tags.Init:
    default:
      return cases.Verifying ? cases.Verifying() : null
    case State.Tags.Error:
      return cases.Rejected ? cases.Rejected(s.error) : null
    case State.Tags.Done:
      return cases.Authed ? cases.Authed(s.result) : null
  }
}
