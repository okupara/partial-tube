import { create } from '../../src/core/FilledString'
import * as E from 'fp-ts/lib/Either'

describe('DateFromString', () => {
  it('should convert from Date to string', () => {
    const res1 = create('hello')
    expect(E.isRight(res1)).toEqual(true)

    const err1 = create(null)
    expect(E.isLeft(err1)).toEqual(true)

    const err2 = create('')
    expect(E.isLeft(err2)).toEqual(true)
  })
})
