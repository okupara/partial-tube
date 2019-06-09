import * as React from "react"
import AppBar from "@material-ui/core/AppBar"
import { styled } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import WhiteTextButton from "./WhiteTextButton"
import { Authentication, isAuthenticated } from "../../domain"
import Condition from "../containers/Condition"
import Avatar from "@material-ui/core/Avatar"

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
  authentication: Authentication
}

const Header = (props: Props) => {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppTitle>Partial Tube</AppTitle>
        <Condition
          cond={isAuthenticated(props.authentication)}
          valid={<StyledAvatar>N</StyledAvatar>}
          invalid={<WhiteTextButton>Login</WhiteTextButton>}
        />
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
