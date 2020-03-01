import React from "react"
import { Margin } from "./MarginDecorator"
import { PlayerController } from "../src/app/components/molecules/PlayerController"
// import { useYoutube } from "../src/app/components/molecules/Youtube"

// type Props = {
//   videoId: string
// }
// export const ExampleYoutubeComponent = ({ videoId }: Props) => {
//   const { refDiv, playerState, readyYoutube, player } = useYoutube({ videoId })
//   const [currentTime, setCurrentTime] = React.useState(0)
//   React.useEffect(() => {
//     if (readyYoutube) {
//       switch (playerState) {
//         /// <reference path="../src/app/types/youtube.d.ts" />
//         case YT.PlayerState.PLAYING:
//           const timerId = setInterval(() => {
//             setCurrentTime(player?.getCurrentTime() || 0)
//           }, 100)
//           return () => clearInterval(timerId)
//         default:
//           // eslint-disable-next-line @typescript-eslint/no-empty-function
//           return () => {}
//       }
//     }
//   }, [readyYoutube, playerState])

//   return (
//     <div>
//       <div>{currentTime}</div>
//       <div ref={refDiv} />
//     </div>
//   )
// }

// export const youtube = () => <ExampleYoutubeComponent videoId="DbLOlBRaQ2s" />

export const playerController = () => <PlayerController />

export default {
  title: "Player",
  decorators: [Margin],
}
