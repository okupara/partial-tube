import React, { useEffect } from 'react'
import useYoutube from 'hooks/useYoutube'

// preparing another component for the story.
// because we cannot hooks things inside of storiesOf().add() directly.

type Props = {
  videoId: string
}
const YoutubeView = (props: Props) => {
  const { refDiv, currentTime, loadVideo } = useYoutube()
  useEffect(() => {
    loadVideo(props.videoId)
  }, [])
  return (
    <div>
      <div ref={refDiv}></div>
      <div>Now: {currentTime}</div>
    </div>
  )
}

export const youtube = () => <YoutubeView videoId="wHCo0Iwra0I" />

export default {
  title: 'Youtube'
}
