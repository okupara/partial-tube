import { Props } from "../src/components/Card/PlaylistCard"

const timestamp = new Date(
  "Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)",
).getTime()
export const playlistsMock: ReadonlyArray<Props> = [
  {
    id: "12345",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: timestamp,
  },
  {
    id: "12346",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: timestamp,
  },
  {
    id: "12347",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: timestamp,
  },
]
