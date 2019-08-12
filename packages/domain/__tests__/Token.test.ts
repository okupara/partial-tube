import * as Token from '../src/Token'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('Token', () => {
  it('should be Left when an empty string comes', () => {
    const res = Token.create('')
    expect(isLeft(res)).toEqual(true)
  })
  it('should be Right when a filled string comes', () => {
    const res = Token.create('hogehoge')
    expect(isRight(res)).toEqual(true)
    if (!isRight(res)) {
      throw new Error('unexpected value')
    }
    expect(res.right).toStrictEqual({ value: 'hogehoge' })
  })
})
