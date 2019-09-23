import * as FP from 'fp-ts/lib/Either'
import * as Token from '../Token'
import * as User from '../User'
import * as I from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as AS from '../core/AbstractState'

export namespace Init {
  export const tag = 'FBAuthInit'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace InProgress {
  export const tag = 'FBAuthInProgress'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace FBAuthFailed {
  export const tag = 'FBAuthFailed'
  export const errorCode = 'FBAE'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'Failed Firebase Auth',
    errorCode
  )
}

export namespace InvalidData {
  export const tag = 'FBAuthInvalidData'
  export const errorCode = 'FBID'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'Got Invalid Data',
    errorCode
  )
}

export namespace Success {
  export const tag = 'FBAuthSuccess'
  export type Type = AS.ValueStatus<typeof tag, Record>
  export const create = AS.buildValueStatusCreator<typeof tag, Record, Type>(
    tag
  )
}

const runtimeType = I.type({
  token: Token.runtimeType,
  user: User.runtimeType
})

export type Record = I.TypeOf<typeof runtimeType>
type validateParam = Parameters<typeof runtimeType.decode>[0]

export const validate = (input: validateParam): State =>
  pipe(
    runtimeType.decode(input),
    FP.fold<I.Errors, Record, State>(
      _ => FP.left(InvalidData.create()),
      a => FP.right(Success.create(a))
    )
  )

export type RightState = Init.Type | InProgress.Type | Success.Type
export type LeftState = FBAuthFailed.Type | InvalidData.Type

export type State = FP.Either<LeftState, RightState>

export const createInit = (): State => FP.right(Init.create())
export const createInProgress = (): State => FP.right(InProgress.create())
export const createFBAuthFailed = (): State => FP.left(FBAuthFailed.create())

export const isInit = (state: State): state is FP.Right<RightState> =>
  FP.isRight(state) ? state.right.tag === Init.tag : false
export const isFailed = (state: State): state is FP.Left<LeftState> =>
  FP.isLeft(state)
export const isSucceeded = (state: State): state is FP.Right<Success.Type> =>
  FP.isRight(state) ? state.right.tag === Success.tag : false
export const isInProgress = (
  state: State
): state is FP.Right<InProgress.Type> =>
  FP.isRight(state) ? state.right.tag === InProgress.tag : false
