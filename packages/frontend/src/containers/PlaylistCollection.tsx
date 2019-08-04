import React from 'react'
import { useAuth } from 'context/Auth'
import { useLogin } from 'hooks/Login'
import Header from 'components/organisms/Header'

export default () => {
  const state = useAuth()
  const login = useLogin()
  return <Header authState={state} onClickLogin={login} />
}
