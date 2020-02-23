import * as I from "io-ts"

const IO = I.type({
  id: I.string,
  title: I.string,
  youtubeId: I.string,
  start: I.number,
  end: I.number,
  comment: I.string,
})

export const create = IO.decode

export type Type = I.TypeOf<typeof IO>
