import { PlaylistCard } from "../src/components/Card/PlaylistCard"

type RequiredProps = Parameters<typeof PlaylistCard>[0]

export const playlistsMock: ReadonlyArray<RequiredProps> = [
  {
    id: "12345",
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
  {
    id: "12346",
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
  {
    id: "12347",
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
]
