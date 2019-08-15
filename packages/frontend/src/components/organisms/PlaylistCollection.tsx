import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Playlist from 'components/molecules/Playlist'
import { Type } from '@partial-tube/domain/lib/PlaylistCollection'

const useStyles = makeStyles(_ => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

type Props = {
  collection: Type
}

const Empty = () => <Typography>There's no items.</Typography>

type ListViewProps = {
  items: Type['items']
}

const ListView = ({ items }: ListViewProps) => (
  <List>
    {items.map(playList => (
      <ListItem>
        <Playlist playList={playList} />
      </ListItem>
    ))}
  </List>
)

const PlaylistCollections = ({ collection }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {collection.items.length === 0 ? (
        <Empty />
      ) : (
        <ListView items={collection.items} />
      )}
    </div>
  )
}

export default PlaylistCollections
