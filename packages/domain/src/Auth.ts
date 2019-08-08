import * as E from 'fp-ts/lib/Either'
import * as io from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as User from './User'
import * as Token from './Token'

export const enum ErrorTags {
  InvalidTokenError = 'InvalidTokenError'
}

enum StateTags {
  Init = 'Init',
  GotToken = 'GotToken',
  Done = 'Done',
  NoStoredTokenError = 'NoStoredTokenError',
  MisMatchError = 'MissMatchError',
  NetworkError = 'NetworkError',
  RejectedError = 'RejectedError'
}

export namespace Init {
  export interface Type {
    tag: StateTags.Init
  }
  export const createState = (): State =>
    E.right({
      tag: StateTags.Init
    })
  export const next = (anything: unknown): State =>
    pipe(
      Token.create(anything),
      E.fold<io.Errors, Token.Record, State>(
        _ => E.left(NoStoredTokenError.create()),
        a => E.right(GotToken.create(a))
      )
    )
}

export namespace GotToken {
  export interface Type {
    tag: StateTags.GotToken
    token: Token.Record
  }
  export const create = (token: Token.Record): Type => ({
    tag: StateTags.GotToken,
    token
  })
  export const next = (anything: unknown): State =>
    pipe(
      User.create(anything),
      E.fold<io.Errors, User.Record, State>(
        _ => E.left(MismatchError.cereate()),
        a => E.right(Done.create(a))
      )
    )
}

export namespace Done {
  export interface Type {
    tag: StateTags.Done
    record: User.Record
  }
  export const create = (record: User.Record): Type => ({
    tag: StateTags.Done,
    record
  })
}

export namespace NoStoredTokenError {
  export interface Type {
    tag: StateTags.NoStoredTokenError
  }
  export const create = (): Type => ({
    tag: StateTags.NoStoredTokenError
  })
}

export namespace MismatchError {
  export interface Type {
    tag: StateTags.MisMatchError
  }
  export const cereate = (): Type => ({
    tag: StateTags.MisMatchError
  })
}

export namespace NetworkError {
  export interface Type {
    tag: StateTags.NetworkError
  }
  export const create = (): Type => ({
    tag: StateTags.NetworkError
  })
  export const createState = (): State => E.left(create())
}

export namespace RejectedError {
  export interface Type {
    tag: StateTags.RejectedError
  }
  export const createState = (): State =>
    E.left({
      tag: StateTags.RejectedError
    })
}

type RightState = Init.Type | GotToken.Type | Done.Type
type AuthError =
  | MismatchError.Type
  | NetworkError.Type
  | NoStoredTokenError.Type
  | RejectedError.Type
type LeftState = AuthError
export type State = E.Either<LeftState, RightState>
export type StateExperiment = RightState | LeftState

export const isStateInit = (s: State): s is E.Right<Init.Type> =>
  E.isRight(s) && s.right.tag === StateTags.Init
export const isStateGotToken = (s: State): s is E.Right<Init.Type> =>
  E.isRight(s) && s.right.tag === StateTags.GotToken
export const done = (s: State): s is E.Right<Done.Type> =>
  E.isRight(s) && s.right.tag === StateTags.Done
export const isError = (s: State): s is E.Left<LeftState> => E.isLeft(s)

// const IsStateLeft = (s: State): s is E.Left<LeftState> => E.isLeft(s)

// assume the function returns unkown because domain doesn't have to know what it is.
export const getToken = (getTokenFn: () => unknown) => {
  const r = getTokenFn()
  return Init.next(r)
}

export const receiveQuery = (queryResult: unknown) => GotToken.next(queryResult)

export const updateNetWorkError = () => NetworkError.createState()

export const updateLoggedIn = (
  saveStorage: (token: Token.Record) => void,
  tokenStr: unknown,
  user: unknown
) => {
  return pipe(
    Token.create(tokenStr),
    E.fold<io.Errors, Token.Record, State>(RejectedError.createState, a => {
      saveStorage(a)
      return GotToken.next(user)
    })
  )
}
