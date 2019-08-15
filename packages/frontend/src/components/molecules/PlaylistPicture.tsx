import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(_ => ({
  cardmedia: {
    width: 200,
    height: 200
  }
}))

const PlayItemPicture = () => {
  const s = useStyles()
  return (
    <CardMedia
      className={s.cardmedia}
      image="https://img.youtube.com/vi/ZhvElt6bqCY/mqdefault.jpg"
      title="test"
    />
  )
}

export default PlayItemPicture
