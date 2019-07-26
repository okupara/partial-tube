import { User } from './User'
import { Either, right, fromOption, either } from 'fp-ts/lib/Either'
import { Option, some } from 'fp-ts/lib/Option'

type Token = string

export const enum ErrorTags {
  InvalidTokenError = 'InvalidTokenError',
  ExpiredTokenError = 'ExpiredTokenError',
  EmptyTokenError = 'EmptyTokenError'
}

type InvalidTokenError = {
  error: Error
  tag: ErrorTags.InvalidTokenError
}

type ExpiredTokenError = {
  error: Error
  tag: ErrorTags.ExpiredTokenError
}

type EmptyTokenError = {
  error: Error
  tag: ErrorTags.EmptyTokenError
}

export type Result = Either<EnsureAuthedUserErrors, User>

type EnsureAuthedUserErrors =
  | InvalidTokenError
  | ExpiredTokenError
  | EmptyTokenError
type GetAuthedInfo = () => Option<Token>
type VerifyToken = (token: Token) => Result

export const emptyTokenError = (): EmptyTokenError => ({
  tag: ErrorTags.EmptyTokenError,
  error: new Error("couldn't find anything")
})

const createToken = (token: string): Token => token
const getAuthedInfo: GetAuthedInfo = () => {
  const a = createToken('')
  return some(a)
}

const verifyToken: VerifyToken = (token: Token) => {
  return right({
    name: 'hoge',
    avatarUrl: 'fooo'
  })
}

const toEitherToken = fromOption(
  () => emptyTokenError() as EnsureAuthedUserErrors
)

export default (): Result =>
  either.chain(toEitherToken(getAuthedInfo()), verifyToken)

// const foo = pipe(
//     toEitherToken(getAuthedInfo()),
//     eitherMap(a => verifyToken(a)),
// )
