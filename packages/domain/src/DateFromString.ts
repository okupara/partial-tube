import * as t from 'io-ts'

const validation = (d: unknown): d is Date =>
  d instanceof Date && d.toString() !== 'Invalid Date'

const DateConverter = new t.Type<Date, string, string>(
  'DateConverter',
  validation,
  (i, c) => {
    const date = new Date(i)
    return validation(date) ? t.success(date) : t.failure(date, c)
  },
  Date
)

export const DateFromStringType = t.string.pipe(
  DateConverter,
  'DateFromStringType'
)

export type ActualType = t.TypeOf<typeof DateFromStringType>
