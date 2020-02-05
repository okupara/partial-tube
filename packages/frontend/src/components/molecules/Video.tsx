// import * as React from 'react'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import TypoGraphy from '@material-ui/core/Typography'
// import { makeStyles, Theme } from '@material-ui/core/styles'
// import { Video as VideoModel } from 'containers/videos/model'

// type Props = {
//   video: VideoModel
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   thumbnail: {
//     width: 200,
//     height: 200
//   },
//   card: {
//     display: 'flex',
//     width: '100%'
//   },
//   description: {
//     paddingTop: theme.spacing(2)
//   }
// }))

// const Video = ({ video }: Props) => {
//   const classes = useStyles()
//   const numVideos = video.items.length
//   return (
//     <Card className={classes.card}>
//       <CardMedia
//         className={classes.thumbnail}
//         image={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
//         title="test"
//       />
//       <CardContent>
//         <TypoGraphy variant="h5" component="h6">
//           {video.title}
//         </TypoGraphy>
//         <TypoGraphy variant="subtitle2">
//           {numVideos === 1 ? '1 item' : `${numVideos} items`}
//         </TypoGraphy>
//         <TypoGraphy
//           className={classes.description}
//           variant="body2"
//           color="textSecondary"
//         >
//           last updated: 11/11/11
//         </TypoGraphy>
//       </CardContent>
//     </Card>
//   )
// }

// export default Video
