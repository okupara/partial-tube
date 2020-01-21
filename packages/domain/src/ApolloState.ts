import * as FP from 'fp-ts/lib/Either'
import * as AS from './core/AbstractState'
import { Errors } from 'io-ts'

export namespace Init {
  export const tag = 'gqlInit'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}
export namespace InProgress {
  export const tag = 'gqlInProgress'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}
export namespace Success {
  export const tag = 'gqlSuccess'
  export type Type<V> = AS.ValueStatus<typeof tag, V>
  export const create = <V = unknown>(value: V): Type<V> => ({
    tag,
    value
  })
}

export namespace ApolloError {
  export const tag = 'gqlError'
  export const errorCode = 'APE'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'An error occured in the process of ApolloClient',
    errorCode
  )
}

export namespace InvalidResultError {
  export const tag = 'gqlInvalidError'
  export const errorCode = 'IRE'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'An error occured in validating the result',
    errorCode
  )
}

export namespace Error {
  export const tag = 'gqlError'
  export const errorCode = 'SLE'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'Save LoggedIn Error',
    errorCode
  )
}

export type LeftState = Error.Type | InvalidResultError.Type
export type RightState<V> = Init.Type | InProgress.Type | Success.Type<V>
export type State<V> = FP.Either<LeftState, RightState<V>>

export type Validate<V> = (input: unknown) => FP.Either<Errors, V>

export type IOResult<A> = FP.Either<Errors, A>

type ParamToState<A> = {
  waiting: boolean
  error?: Error
  data: IOResult<A> | null
}

export const toState = <A>(params: ParamToState<A>): State<A> => {
  if (params.error) {
    return FP.left(Error.create()) // TODO: reconsider how to deal with each error details
  }
  if (params.waiting) {
    return FP.right(InProgress.create())
  }
  if (params.data) {
    return FP.isLeft(params.data)
      ? FP.left(InvalidResultError.create())
      : FP.right(Success.create<A>(params.data.right))
  }
  return FP.right(Init.create())
}

export const notDone = <V>(state: State<V>) =>
  FP.isRight(state)
    ? state.right.tag === Init.tag || state.right.tag === InProgress.tag
    : false
export const isSucceeded = <V>(
  state: State<V>
): state is FP.Right<Success.Type<V>> =>
  FP.isRight(state) ? state.right.tag === Success.tag : false
export const isFailed = <V>(state: State<V>): state is FP.Left<Error.Type> =>
  FP.isLeft(state)
export const isInit = <V>(state: State<V>): state is FP.Right<Init.Type> =>
  FP.isRight(state) ? state.right.tag === Init.tag : false
export const isInProgress = <V>(
  state: State<V>
): state is FP.Right<InProgress.Type> =>
  FP.isRight(state) ? state.right.tag === InProgress.tag : false

export const createInit = <V = unknown>(): State<V> => FP.right(Init.create())

type MatchFuncs<V, T> = {
  waiting: () => T
  error: () => T
  success: (value: V) => T
}

export const match = <V, T>(state: State<V>, funcs: MatchFuncs<V, T>) => {
  if (FP.isLeft(state)) {
    return funcs.error()
  }
  switch (state.right.tag) {
    case Success.tag:
      return funcs.success(state.right.value)
    default:
      return funcs.waiting()
  }
}
