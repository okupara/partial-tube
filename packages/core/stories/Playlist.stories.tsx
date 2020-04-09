import React from "react"
import { UserDcorator } from "./Decorators"
import { Playlist } from "../src/layouts/Playlist"
import { partialVideListMock } from "../__mocks__/ParitalVideoList"

export const playlist = () => (
  <Playlist
    id="123455"
    onClickPlay={(id) => console.log(id)}
    videos={partialVideListMock}
    title="aaaaaaaaa"
    lastUpdate={new Date()}
    numOfVideos={10}
    comment="comentemememem"
    totalSec={30}
    onClickCard={(id) => console.log(`${id} clicked`)}
  />
)

export default {
  title: "Layouts",
  decorators: [UserDcorator],
}
