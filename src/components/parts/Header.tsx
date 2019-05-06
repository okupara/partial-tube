import * as React from "react"
import AppBar from "@material-ui/core/AppBar"
import { styled } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"

const AppTitle = styled(Typography)({
  flexGrow: 1
})

const StyledAppBar = styled(AppBar)({
  flexGrow: 1
})

const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppTitle>Partial Tube</AppTitle>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
