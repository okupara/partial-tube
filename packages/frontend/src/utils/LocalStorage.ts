import * as Token from '@partial-tube/domain/lib/Token'

export const getToken = () => localStorage.getItem('token')

export const setToken = (token: Token.Record) =>
  localStorage.setItem('token', token.value)

export const clearToken = () => localStorage.setItem('token', '')
