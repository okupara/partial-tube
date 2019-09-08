import * as fb from './Firebase'
import * as token from './TokenVerification'
import * as s from '../core/AbstractState'
import * as User from '../User'

export namespace Waiting {
  export const tag = 'AuthWaiting'
  export type Type = s.Status<typeof tag>
  export const create = s.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace Failed {
  export const tag = 'AuthFailed'
  export type Type = {
    tag: typeof tag
    reason?: Error
  }
  export const create = (error?: Error): Type =>
    error ? { tag } : { tag, reason: error }
}

export namespace Success {
  export const tag = 'AuthSuccess'
  export type Type = {
    tag: typeof tag
    user: User.Record
  }
  export const create = (user: User.Record): Type => ({
    tag,
    user
  })
}

export type State = Failed.Type | Waiting.Type | Success.Type

type Param = {
  fbState: fb.State
  tokenState: token.State
}
export const makeCurrentState = ({ fbState, tokenState }: Param): State => {
  if (fb.isFailed(fbState) && token.isFailed(tokenState)) {
    return Failed.create()
  }
  if (fb.isSucceeded(fbState)) {
    return Success.create(fbState.right.value.user)
  }
  if (token.isSucceeded(tokenState)) {
    return Success.create(tokenState.right.user)
  }
  return Waiting.create()
}

export type MatchParam<R> = {
  waiting: () => R
  failed: (reason?: Error) => R
  success: (user: User.Record) => R
}
export const match = <R>(state: State, param: MatchParam<R>): R => {
  switch (state.tag) {
    case Waiting.tag:
    default:
      return param.waiting()
    case Success.tag:
      return param.success(state.user)
    case Failed.tag:
      return param.failed(state.reason)
  }
}
