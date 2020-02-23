import PartialVideoCard from "../src/app/components/molecules/PartialVideoCard"

type RequiredProps = Parameters<typeof PartialVideoCard>[0]

export const mocks: ReadonlyArray<RequiredProps> = [
  {
    title: "ホラーすぎる彼女です",
    youtubeId: "w4A1CHEpqvw",
    start: 20,
    end: 80,
    comment: "testststs",
  },
]
