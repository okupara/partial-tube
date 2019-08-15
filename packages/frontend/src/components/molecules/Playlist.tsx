import React from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/styles'
import CardContent from '@material-ui/core/CardContent'
import TypoGraphy from '@material-ui/core/Typography'
import PlaylistPicture from 'components/molecules/PlaylistPicture'
import { Playlist } from '@partial-tube/domain/lib/PlaylistCollection'

type Props = {
  playList: Playlist.Type
}

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    maxWidth: 800
  }
}))

const PlayItem = ({ playList }: Props) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <PlaylistPicture />
      <CardContent>
        <TypoGraphy variant="h6" component="h6">
          {playList.title}
        </TypoGraphy>
        <TypoGraphy variant="subtitle1">
          {playList.items.length} items
        </TypoGraphy>
        <TypoGraphy variant="subtitle2" color="textSecondary">
          {/* TODO: maybe I wanna change the color between an empty case and filled case */}
          {playList.description.length > 0
            ? playList.description
            : 'no description'}
        </TypoGraphy>
      </CardContent>
    </Card>
  )
}

export default PlayItem
