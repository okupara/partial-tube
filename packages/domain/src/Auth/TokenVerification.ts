import {
  Either,
  fold,
  right,
  left,
  Right,
  Left,
  isLeft,
  isRight
} from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'
import * as Token from '../Token'
import * as s from '../core/AbstractState'
import * as User from '../User'

export namespace Init {
  export const tag = 'Init'
  export type Type = s.Status<typeof tag>
  export const create = s.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace TokenExisted {
  export const tag = 'TokenExisted'
  export type Type = {
    tag: typeof tag
    token: Token.Record
  }
  export const create = (token: Token.Record): Type => ({
    tag,
    token
  })
}

export namespace TokenNotExisted {
  export const tag = 'TokenNotExisted'
  export type Type = s.Status<typeof tag>
  export const create = s.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace NetworkError {
  export const tag = 'NetworkError'
  export type Type = s.Status<typeof tag>
  export const create = s.buildStatusCreator<typeof tag, Type>(tag)
}
export namespace InvalidTokenError {
  export const tag = 'InvalidTokenError'
  export type Type = s.Status<typeof tag>
  export const create = s.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace Success {
  export const tag = 'VerifyicationTokenSuccess'
  export type Type = {
    tag: typeof tag
    user: User.Record
  }
  export const create = (user: User.Record): Type => ({
    tag,
    user
  })
}

type RightState = Init.Type | TokenExisted.Type | Success.Type
type LeftState =
  | NetworkError.Type
  | InvalidTokenError.Type
  | TokenNotExisted.Type
export type State = Either<LeftState, RightState>

export const validateToken = (token: unknown): State =>
  pipe(
    Token.create(token),
    fold<t.Errors, Token.Record, State>(
      _ => left(TokenNotExisted.create()),
      t => right(TokenExisted.create(t))
    )
  )

export const validateUser = (user: unknown): State =>
  pipe(
    User.create(user),
    fold<t.Errors, User.Record, State>(
      _ => left(InvalidTokenError.create()),
      u => right(Success.create(u))
    )
  )

export const createNetworkError = (): State => left(NetworkError.create())
export const createInit = (): State => right(Init.create())
export const createInvalidTokenError = (): State =>
  left(InvalidTokenError.create())

export const isInit = (s: State): s is Right<Init.Type> =>
  isRight(s) ? s.right.tag === Init.tag : false
export const existedToken = (s: State): s is Right<TokenExisted.Type> =>
  isRight(s) ? s.right.tag === TokenExisted.tag : false
export const notExistedToken = (s: State): s is Left<TokenNotExisted.Type> =>
  isLeft(s) ? s.left.tag === TokenNotExisted.tag : false
export const isFailed = (s: State): s is Left<LeftState> => isLeft(s)
export const isWithToken = (s: State): s is Right<TokenExisted.Type> =>
  isRight(s) ? s.right.tag === TokenExisted.tag : false
export const isSucceeded = (s: State): s is Right<Success.Type> =>
  isRight(s) ? s.right.tag === Success.tag : false
