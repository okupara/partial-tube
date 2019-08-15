import React from 'react'
import * as Headers from 'components/organisms/Headers'
import { storiesOf } from '@storybook/react'

storiesOf('Header', module)
  .add('default', () => <Headers.Default />)
  .add('withLoginButton', () => <Headers.NotSigned signIn={() => {}} />)
  .add('afterLogIn', () => <Headers.Signed signOut={() => {}} />)
