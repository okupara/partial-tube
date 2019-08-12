import * as io from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Either'

export interface Record {
  value: string
}

export const create = (anything: unknown) => {
  const result = pipe(
    io.string.decode(anything),
    map<string, Record>(t => ({ value: t }))
  )
  return result
}
