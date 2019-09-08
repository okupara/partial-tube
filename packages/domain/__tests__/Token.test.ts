import * as Token from '../src/Token'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('Token', () => {
  it('should be Left', () => {
    const res = Token.create('')
    expect(isLeft(res)).toEqual(true)

    const resUndef = Token.create(undefined)
    expect(isLeft(resUndef)).toEqual(true)

    const resNull = Token.create(null)
    expect(isLeft(resNull)).toEqual(true)
  })
  it('should be Right', () => {
    const res = Token.create('hogehoge')
    expect(isRight(res)).toEqual(true)
    if (!isRight(res)) {
      throw new Error('unexpected value')
    }
    expect(res.right).toStrictEqual({ value: 'hogehoge' })
  })
})
