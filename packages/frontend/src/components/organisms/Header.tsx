import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { styled } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import LoginButton from 'components/molecules/LoginButton'
import Either from 'components/helpers/Either'
import Avatar from '@material-ui/core/Avatar'
import { Result } from '@partial-tube/domain/lib/EnsureAuthedUser'

const AppTitle = styled(Typography)({
  flexGrow: 1
})

const StyledAppBar = styled(AppBar)({
  flexGrow: 1
})

const StyledAvatar = styled(Avatar)({
  margin: 10
})

interface Props {
  auth: Result
}

const Header = (props: Props) => {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppTitle>Partial Tube</AppTitle>
        <Either
          either={props.auth}
          left={_ => <LoginButton />}
          right={_ => <StyledAvatar>N</StyledAvatar>}
        />
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
