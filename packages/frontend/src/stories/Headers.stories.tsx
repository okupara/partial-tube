import React from 'react'
import Header from 'components/organisms/Header'
import UserMenu from 'components/organisms/UserMenu'
import { storiesOf } from '@storybook/react'

storiesOf('Header', module)
  .add('Before Log-in', () => <Header />)
  .add('After Log-in', () => <Header menu={<UserMenu />} />)
