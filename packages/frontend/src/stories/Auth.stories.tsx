import * as React from 'react'
import AuthWaiting from 'containers/AuthWaiting'
import Login from 'containers/Login'

export const waiting = () => <AuthWaiting />
export const login = () => <Login loginDispatcher={() => {}} />

export default {
  title: 'Auth'
}
