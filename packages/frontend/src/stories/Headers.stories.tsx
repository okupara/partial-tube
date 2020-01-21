import React from 'react'
import Header from 'components/organisms/Header'
import UserMenu from 'components/organisms/UserMenu'

export const beforeLogin = () => <Header />
export const afterLogin = () => <Header menu={<UserMenu />} />

export default {
  title: 'Header',
  component: Header
}
