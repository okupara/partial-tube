import React from 'react'
import { storiesOf } from '@storybook/react'

declare global {
  interface Window {
    YT: any
  }
}

const Youtube = () => {
  React.useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    if (firstScriptTag && firstScriptTag.parentNode) {
      console.log('OK')
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      console.log('NG')
    }
    setTimeout(() => {
      new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          onReady: (ev: any) => {
            ev.target.playVideo()
            console.log('READY!!!')
          },
          onStateChange: () => {
            console.log('STATE CHANGED!!!')
          }
        }
      })
    }, 800)
  }, [])
  return (
    <>
      <div id="player"></div>
    </>
  )
}

storiesOf('Youtube', module).add('default', () => {
  return <Youtube />
})
