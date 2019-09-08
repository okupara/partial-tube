import { useState, useEffect } from 'react'
import * as t from '@partial-tube/domain/lib/Auth/TokenVerification'
import { getToken, clearToken } from 'utils/LocalStorage'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

export const query = gql`
  query {
    verify {
      userId
      name
      avatarUrl
    }
  }
`
type VerifyResponse = {
  verify: unknown
}

const updateState = (setState: any, res: any) => {
  if (res.data) return setState(t.validateUser(res.data))
  if (res.error) {
    clearToken()
    return setState(t.createInvalidTokenError())
  }
}

const useVerifyToken = () => {
  const [execute, res] = useLazyQuery<VerifyResponse>(query)
  const [skipState, setSkipState] = useState(true)
  const [state, setState] = useState<t.State>(t.createInit())
  useEffect(() => {
    // preventing to return an unexpected thing as useEffect's return value.
    ;(() => {
      if (skipState) {
        return
      }
      if (t.isInit(state)) {
        setState(t.validateToken(getToken()))
      }
      if (t.isWithToken(state)) {
        if (!res.called) {
          return execute()
        }
        updateState(setState, res)
      }
    })()
  }, [state, skipState, res])
  const dispatcher = () => {
    setSkipState(false)
  }

  return {
    dispatcher,
    state
  }
}

export default useVerifyToken
