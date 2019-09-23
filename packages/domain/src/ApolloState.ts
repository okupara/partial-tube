import * as FP from 'fp-ts/lib/Either'
import * as AS from './core/AbstractState'

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
  export const create = <V>(value: V): Type<V> => ({
    tag,
    value
  })
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

export type LeftState = Error.Type
export type RightState<V> = Init.Type | InProgress.Type | Success.Type<V>
export type State<V> = FP.Either<LeftState, RightState<V>>

export const toState = <V = unknown>(
  waiting: boolean,
  error?: Error,
  data?: V
): State<V> => {
  if (error) {
    return FP.left(Error.create()) // TODO: reconsider how to deal with each error details
  }
  if (waiting) {
    return FP.right(InProgress.create())
  }
  if (data) {
    return FP.right(Success.create<V>(data))
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
