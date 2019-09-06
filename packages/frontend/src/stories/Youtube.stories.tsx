import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('Youtube', module).add('default', () => {
  return <YoutubeView videoId="wHCo0Iwra0I" />
})
