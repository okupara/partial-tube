import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: theme.spacing(1)
  }
}))

const UserMenu = () => {
  const classes = useStyles()
  return <Avatar className={classes.avatar}>N</Avatar>
}

export default UserMenu
