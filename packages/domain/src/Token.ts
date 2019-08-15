import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

export interface Record {
  value: string
}

class FilledString extends t.Type<string> {
  readonly _tag = 'FilledString'
  constructor() {
    super(
      'FilledString',
      (u): u is string => typeof u === 'string' && u.length > 0,
      (input, context) =>
        this.is(input) ? t.success(input) : t.failure(input, context),
      t.identity
    )
  }
}
const filledString: FilledString = new FilledString()
FilledString

export const create = (anything: unknown) => {
  const result = pipe(
    filledString.decode(anything),
    map<string, Record>(t => ({ value: t }))
  )
  return result
}
