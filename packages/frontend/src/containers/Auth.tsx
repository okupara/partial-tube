import React, { useState, useEffect } from 'react'
import { right, isRight, Either } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { task, chain } from 'fp-ts/lib/Task'
import * as Auth from '@partial-tube/domain/lib/Auth'
import * as State from '@partial-tube/domain/lib/State'
import * as User from '@partial-tube/domain/lib/User'
import Cases from 'containers/helpers/Cases'

const getTokenLS = () => localStorage.getItem('token')

// useCallback something...
const dummyAPI = (a: Either<Auth.InvalidTokenError, Auth.Token>) => (): Promise<
  Auth.Result
> =>
  isRight(a)
    ? Promise.resolve(right({ name: 'hoge', avatarUrl: 'huga' }))
    : Promise.resolve(a)

const useAuth = () => {
  const [state, setState] = useState<State.Type<Auth.Error, User.Record>>(
    State.init()
  )

  useEffect(() => {
    if (State.notFinished(state)) {
      pipe(
        task.of(Auth.retrieveToken(getTokenLS)),
        chain((a: any) => dummyAPI(a))
      )().then(result => {
        isRight(result)
          ? setState(State.complete(result.right))
          : setState(State.fail(result.left))
      })
    }
  }, [state])

  return state
}

export default () => {
  const state = useAuth()
  return (
    <Cases
      state={state}
      init={() => <div>init</div>}
      waiting={() => <div>waiting</div>}
      error={() => <div>error</div>}
      done={() => <div>done</div>}
    />
  )
}
