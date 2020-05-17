import { Playlist } from "../src/graphql/type-defs.graphqls"

const timestamp = new Date(
  "Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)",
).getTime()
export const playlistsMock: ReadonlyArray<Playlist> = [
  {
    id: "12345",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    firstVideoId: "Z2J7u2j5BJM",
    permission: "public",
    totalSec: 10,
    created: timestamp,
    videos: [],
  },
  {
    id: "12346",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    permission: "private",
    firstVideoId: "Z2J7u2j5BJM",
    totalSec: 8,
    created: timestamp,
    videos: [],
  },
  {
    id: "12347",
    name: "hello",
    comment: "Foobar",
    numOfVideos: 1,
    permission: "public",
    firstVideoId: "Z2J7u2j5BJM",
    totalSec: 10,
    created: timestamp,
    videos: [],
  },
]
