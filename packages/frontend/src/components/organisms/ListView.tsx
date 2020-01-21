import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { concatNullable } from 'utils/ClassConcatinator'
import { makeStyles, Theme } from '@material-ui/core/styles'

type Props<T> = {
  list: T[]
  className?: string
  itemRender: (value: T) => JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 800
  }
}))

const Videos = <T extends any>(props: Props<T>) => {
  const classes = useStyles()
  return (
    <List className={concatNullable(classes.root, props.className)}>
      {props.list.map(v => (
        <ListItem>{props.itemRender(v)}</ListItem>
      ))}
    </List>
  )
}

export default Videos
