import * as React from 'react'
import { WhiteTextButton } from '../atoms/Buttons'

interface Props {
  onClick?: () => void
}

export default (props: Props) => (
  <WhiteTextButton onClick={() => props.onClick && props.onClick()}>
    Login
  </WhiteTextButton>
)
