import React, { createContext, useState, useEffect, useContext } from 'react'
import { right, isRight, Either, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { task, chain } from 'fp-ts/lib/Task'
import * as State from '@partial-tube/domain/lib/State'
import * as Auth from '@partial-tube/domain/lib/Auth'
import * as User from '@partial-tube/domain/lib/User'

type StateType = State.Type<Auth.Error, User.Record>
type CompleteDispatcher = (user: User.Record, token: string) => void

const Context = createContext<StateType>(State.init())
const DispatchContext = createContext<CompleteDispatcher>(() => {})

interface Props {
  children: JSX.Element
}

const getTokenLS = () => localStorage.getItem('token')
const setTokenLS = (token: Auth.Token) =>
  localStorage.setItem('token', token.value)

const dummyAPI = (a: Either<Auth.InvalidTokenError, Auth.Token>) => (): Promise<
  Auth.Result
> =>
  isRight(a)
    ? Promise.resolve(right({ name: 'hoge', avatarUrl: 'huga' }))
    : Promise.resolve(a)

const update = (setState: (state: Auth.State) => void, result: Auth.Result) => {
  isRight(result)
    ? setState(State.complete(result.right))
    : setState(State.fail(result.left))
}

const _updateAuthState = (setState: (s: Auth.State) => void) => (
  user: User.Record,
  tokenStr: string
) => {
  const res = Auth.createToken(tokenStr)
  fold<Auth.Error, Auth.Token, void>(
    e => setState(State.fail(e)),
    r => {
      setTokenLS(r)
      setState(State.complete(user))
    }
  )(res)
}

export const Provider = (props: Props) => {
  const [state, setState] = useState<StateType>(State.init())
  // useCallback???
  const updateAuthState = _updateAuthState(setState)
  useEffect(() => {
    if (State.notFinished(state)) {
      // the main sequence
      pipe(
        task.of(Auth.retrieveToken(getTokenLS)),
        chain((a: any) => dummyAPI(a))
      )().then(result => {
        update(setState, result)
      })
    }
  }, [state])
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={updateAuthState}>
        {props.children}
      </DispatchContext.Provider>
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context)
export const useAuthDispatcher = () => useContext(DispatchContext)
