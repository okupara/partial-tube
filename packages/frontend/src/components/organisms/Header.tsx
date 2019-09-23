import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
// import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1
  },
  appBar: {
    flexGrow: 1
  },
  avatar: {
    margin: theme.spacing(2)
  }
}))

// const AppTitle = styled(Typography)({
//   flexGrow: 1
// })

// const StyledAppBar = styled(AppBar)({
//   flexGrow: 1
// })

// const StyledAvatar = styled(Avatar)({
//   margin: 10
// })

type Props = {
  menu?: JSX.Element
}

const Header = (props: Props) => {
  const classes = useStyles()
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title}>Partial Tube</Typography>
        {props.menu ? props.menu : null}
        {/* <Avatar className={classes.avatar}>N</Avatar> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header
