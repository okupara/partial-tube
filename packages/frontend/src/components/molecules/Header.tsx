import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { styled } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
// import LoginButton from 'components/molecules/LoginButton'
// import Avatar from '@material-ui/core/Avatar'

const AppTitle = styled(Typography)({
  flexGrow: 1
})

const StyledAppBar = styled(AppBar)({
  flexGrow: 1
})

// const StyledAvatar = styled(Avatar)({
//   margin: 10
// })

type Props = {
  children?: JSX.Element
}

const Header = (props: Props) => (
  <StyledAppBar>
    <Toolbar>
      <AppTitle>Partial Tube</AppTitle>
      {props.children ? props.children : null}
    </Toolbar>
  </StyledAppBar>
)

export default Header
