import * as React from 'react'
import { storiesOf } from '@storybook/react'
import AuthWaiting from 'containers/AuthWaiting'
import Login from 'containers/Login'

storiesOf('Auth', module)
  .add('waiting', () => <AuthWaiting />)
  .add('login', () => <Login loginDispatcher={() => {}} />)
