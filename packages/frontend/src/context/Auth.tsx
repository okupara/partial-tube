import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as Auth from '@partial-tube/domain/lib/Auth'
import * as Token from '@partial-tube/domain/lib/Token'

type CompleteDispatcher = (user: unknown, token: unknown) => void

const Context = createContext<Auth.State>(Auth.Init.createState())
const DispatchContext = createContext<CompleteDispatcher>(() => {})

interface Props {
  children: JSX.Element
}

const getTokenLS = () => localStorage.getItem('token')
const setTokenLS = (token: Token.Record) =>
  localStorage.setItem('token', token.value)

const query = gql`
  query verify: User {
    name,
    avatarUrl
  }
`
const _loginDoneDidpatch = (setState: (s: Auth.State) => void) => (
  t: unknown,
  u: unknown
) => setState(Auth.updateLoggedIn(setTokenLS, t, u))

const _dispatch = (setState: (state: Auth.State) => void) => (
  state: Auth.State
) => setState(state)

export const Provider = (props: Props) => {
  const [state, setState] = useState<Auth.State>(Auth.Init.createState())
  const dispatch = useCallback(_dispatch(setState), [])
  const client = useApolloClient()
  const loginDispatch = _loginDoneDidpatch(setState)

  useEffect(() => {
    if (Auth.isStateInit(state)) {
      dispatch(Auth.getToken(getTokenLS))
    }
    if (Auth.isStateGotToken(state)) {
      client
        .query(query)
        .then(a => dispatch(Auth.receiveQuery(a)))
        .catch(e => dispatch(Auth.updateNetWorkError()))
    }
  }, [state])
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={loginDispatch}>
        {props.children}
      </DispatchContext.Provider>
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context)
export const useAuthDispatcher = () => useContext(DispatchContext)
