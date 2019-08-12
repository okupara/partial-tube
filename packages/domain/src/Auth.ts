import * as E from 'fp-ts/lib/Either'
import * as io from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as User from './User'
import * as Token from './Token'

enum StateTags {
  MisMatchError = 'MissMatchError',
  NetworkError = 'NetworkError',
  RejectedError = 'RejectedError',
  InvalidTokenError = 'InvalidTokenError'
}

namespace Init {
  export const tag = 'Init'
  export interface Type {
    tag: typeof tag
  }
  export const createState = (): State =>
    E.right({
      tag
    })
}

namespace GotToken {
  export const tag = 'GotToken'
  export interface Type {
    tag: typeof tag
    token: Token.Record
  }
  export const create = (token: Token.Record): Type => ({
    tag,
    token
  })
  export const takeToken = (anything: unknown): State =>
    pipe(
      Token.create(anything),
      E.fold<io.Errors, Token.Record, State>(
        _ => E.left(NoStoredTokenError.create()),
        a => E.right(GotToken.create(a))
      )
    )
}

namespace Done {
  export const tag = 'Done'
  export interface Type {
    tag: typeof tag
    record: User.Record
  }
  export const create = (record: User.Record): Type => ({
    tag,
    record
  })
  export const takeResult = (anything: unknown): State =>
    pipe(
      User.create(anything),
      E.fold<io.Errors, User.Record, State>(
        _ => E.left(MismatchError.cereate()),
        a => E.right(Done.create(a))
      )
    )
}

namespace NoStoredTokenError {
  export const tag = 'NoStoredTokenError'
  export interface Type {
    tag: typeof tag
  }
  export const create = (): Type => ({
    tag
  })
}

namespace MismatchError {
  export interface Type {
    tag: StateTags.MisMatchError
  }
  export const cereate = (): Type => ({
    tag: StateTags.MisMatchError
  })
}

namespace NetworkError {
  export interface Type {
    tag: StateTags.NetworkError
  }
  export const create = (): Type => ({
    tag: StateTags.NetworkError
  })
  export const createState = (): State => E.left(create())
}

export namespace InvalidTokenError {
  export const tag = 'InvalidTokenError'
  export interface Type {
    tag: typeof tag
  }
  export const create = (): Type => ({
    tag
  })
}

namespace RejectedError {
  export interface Type {
    tag: StateTags.RejectedError
  }
  export const createState = (): State =>
    E.left({
      tag: StateTags.RejectedError
    })
}

type RightState = Init.Type | GotToken.Type | Done.Type
export type ErrorTypes =
  | MismatchError.Type
  | NetworkError.Type
  | NoStoredTokenError.Type
  | RejectedError.Type
type LeftState = ErrorTypes
export type State = E.Either<LeftState, RightState>

export const isStateInit = (s: State): s is E.Right<Init.Type> =>
  E.isRight(s) && s.right.tag === Init.tag
export const isStateGotToken = (s: State): s is E.Right<Init.Type> =>
  E.isRight(s) && s.right.tag === GotToken.tag
export const isStateDone = (s: State): s is E.Right<Done.Type> =>
  E.isRight(s) && s.right.tag === Done.tag
export const isErrorState = (s: State): s is E.Left<LeftState> => E.isLeft(s)

export const isNetworkError = (e: ErrorTypes): e is NetworkError.Type =>
  e.tag === StateTags.NetworkError

// const IsStateLeft = (s: State): s is E.Left<LeftState> => E.isLeft(s)

// assume the function returns unkown because domain doesn't have to know what it is.
export const takeToken = (token: unknown) => GotToken.takeToken(token)

export const init = Init.createState

export const takeQueryResult = (state: State, queryResult: unknown) =>
  E.isLeft(state) ? state : Done.takeResult(queryResult)

export const beNetWorkError = () => NetworkError.createState()
export const beRejectedError = () => RejectedError.createState()

// it means unvalidated parameters which the function below validates
export interface takeLoggedInCommand {
  token: unknown
  user: unknown
}
export const takeLoggedIn = (
  saveStorage: (token: Token.Record) => void,
  command: takeLoggedInCommand
) => {
  return pipe(
    Token.create(command.token),
    E.fold<io.Errors, Token.Record, State>(RejectedError.createState, a => {
      saveStorage(a)
      return Done.takeResult(command.user)
    })
  )
}
