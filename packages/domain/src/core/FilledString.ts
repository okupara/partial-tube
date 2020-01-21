import * as t from 'io-ts'

const validation = (i: string): i is string => i.length > 0

const FilledString = new t.Type<string, string, string>(
  'FilledStringChecker',
  validation,
  (i, c) => (validation(i) ? t.success(i) : t.failure(i, c)),
  t.identity
)

const PipedFilledString = t.string.pipe(
  FilledString,
  'FilledString'
)

export const create = PipedFilledString.decode
export const IOType = PipedFilledString
