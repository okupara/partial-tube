import PlaylistCard from "../src/app/components/molecules/PlaylistCard"

type RequiredProps = Parameters<typeof PlaylistCard>[0]

export const mocks: ReadonlyArray<RequiredProps> = [
  {
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
  {
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
  {
    title: "hello",
    comment: "Foobar",
    cnt: 1,
    firstVideoId: "Z2J7u2j5BJM",
    updated: new Date("Mon Feb 24 2020 21:58:58 GMT+0900 (Japan Standard Time)"),
  },
]
