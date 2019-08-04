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
  whenVerifying: () => JSX.Element
  whenRejected: (e: Auth.Error) => JSX.Element
  whenAuthed: (u: User.Record) => JSX.Element
}
const Cases = (props: CasesProps) =>
  Auth.processAuthState(props.authState, {
    Verifying: props.whenVerifying,
    Rejected: props.whenRejected,
    Authed: props.whenAuthed
  })

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
          whenVerifying={() => <div />}
          whenRejected={() => <LoginButton onClick={props.onClickLogin} />}
          whenAuthed={() => <StyledAvatar>N</StyledAvatar>}
        />
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
