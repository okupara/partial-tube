import * as FilledString from '../src/core/FilledString'
import * as t from 'io-ts'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('FilledStringChecker', () => {
  it('should be Left', () => {
    const resUndef = FilledString.create(undefined)
    expect(isLeft(resUndef)).toEqual(true)

    const resEmptyString = FilledString.create('')
    expect(isLeft(resEmptyString)).toEqual(true)

    const User = t.type({ userId: FilledString.runtimeType })
    const resEmptyObj = User.decode({})
    expect(isLeft(resEmptyObj)).toEqual(true)

    const resNullField = User.decode({ userId: null })
    expect(isLeft(resNullField)).toEqual(true)
  })

  it('should be Right', () => {
    const resStr = FilledString.create('xxxxxxx')
    expect(isRight(resStr)).toEqual(true)

    const User = t.type({ userId: FilledString.runtimeType })
    const resObj = User.decode({ userId: 'foooo' })
    expect(isRight(resObj)).toEqual(true)
  })
})
