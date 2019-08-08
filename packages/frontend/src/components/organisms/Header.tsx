import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { styled } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import LoginButton from 'components/molecules/LoginButton'
import Avatar from '@material-ui/core/Avatar'
import * as Auth from '@partial-tube/domain/lib/Auth'
import * as User from '@partial-tube/domain/lib/User'

const AppTitle = styled(Typography)({
  flexGrow: 1
})

const StyledAppBar = styled(AppBar)({
  flexGrow: 1
})

const StyledAvatar = styled(Avatar)({
  margin: 10
})

interface CasesProps {
  authState: Auth.State
  default: () => JSX.Element
  error: () => JSX.Element
  authed: (u: User.Record) => JSX.Element
}
const Cases = (props: CasesProps) => {
  if (Auth.isError(props.authState)) {
    return props.error()
  }
  if (Auth.done(props.authState)) {
    return props.authed(props.authState.right.record)
  }
  return props.default()
}

interface Props {
  authState: Auth.State
  onClickLogin: () => void
}

const Header = (props: Props) => {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppTitle>Partial Tube</AppTitle>
        <Cases
          authState={props.authState}
          default={() => <div />}
          error={() => <LoginButton onClick={props.onClickLogin} />}
          authed={() => <StyledAvatar>N</StyledAvatar>}
        />
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
