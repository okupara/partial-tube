import React from 'react'
import { styled } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Header from 'components/molecules/Header'
import LoginButton from 'components/molecules/LoginButton'

export const Default = () => <Header />

type NotSignedPorps = {
  signIn: () => void
}
export const NotSigned = (props: NotSignedPorps) => (
  <Header>
    <LoginButton onClick={() => props.signIn()} />
  </Header>
)

const StyledAvatar = styled(Avatar)({
  margin: 10
})

type SignedProps = {
  signOut: () => void
}

export const Signed = (props: SignedProps) => (
  <Header>
    <StyledAvatar>N</StyledAvatar>
  </Header>
)
