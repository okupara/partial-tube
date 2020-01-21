import { DateFromStringType } from '../../src/core/DateFromString'
import * as E from 'fp-ts/lib/Either'

describe('DateFromString', () => {
  it('should convert from Date to string', () => {
    const date = new Date()
    const dateStr = date.toUTCString()
    const res = DateFromStringType.decode(dateStr)
    expect(E.isRight(res)).toEqual(true)
    if (E.isLeft(res)) throw new Error('an unexpected behaviour')
    const encoded = DateFromStringType.encode(res.right)
    expect(encoded).toEqual(dateStr)
  })
})
