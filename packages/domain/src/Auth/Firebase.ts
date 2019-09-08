import {
  Either,
  Left,
  Right,
  isLeft,
  fold,
  left,
  right,
  isRight
} from 'fp-ts/lib/Either'
import * as Token from '../Token'
import * as User from '../User'
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'

namespace InProgress {
  export const tag = 'InProgress'
  export type Type = {
    tag: typeof tag
  }
  export const create = (): Type => ({
    tag
  })
}

namespace Failed {
  export const tag = 'Failed'
  export type Type = {
    tag: typeof tag
  }
  export const create = (): Type => ({
    tag
  })
}

namespace Success {
  export const tag = 'Success'
  export type Type = {
    tag: typeof tag
    value: Record
  }
  export const create = (value: Record): Type => ({
    tag,
    value
  })
}

const runtimeType = t.type({
  token: Token.runtimeType,
  user: User.runtimeType
})

type Record = t.TypeOf<typeof runtimeType>
type validateParam = Parameters<typeof runtimeType.decode>[0]

export const validate = (input: validateParam): State =>
  pipe(
    runtimeType.decode(input),
    fold<t.Errors, Record, State>(
      _ => left(Failed.create()),
      a => right(Success.create(a))
    )
  )

export type RightState = InProgress.Type | Success.Type
export type LeftState = Failed.Type

export type State = Either<LeftState, RightState>

export const createInProgress = (): State => right(InProgress.create())
export const createFailed = (): State => left(Failed.create())

export const isFailed = (state: State): state is Left<LeftState> =>
  isLeft(state) ? state.left.tag === Failed.tag : false
export const isSucceeded = (state: State): state is Right<Success.Type> =>
  isRight(state) ? state.right.tag === Success.tag : false
export const isInProgress = (state: State): state is Right<InProgress.Type> =>
  isRight(state) ? state.right.tag === InProgress.tag : false
