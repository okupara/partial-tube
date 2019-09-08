import * as Firebase from '../../src/Auth/Firebase'
import { isRight } from 'fp-ts/lib/Either'

describe('Firebase on Authorizing', () => {
  const tokenValue = 'hogehoge'
  const userRecord = {
    userId: 'xxx-1111',
    name: 'hogeo',
    avatarUrl: 'http://hogehoge.com/aaa.jpg'
  }
  it('it should be Right', () => {
    const res = Firebase.validate({
      token: tokenValue,
      user: userRecord
    })
    expect(isRight(res)).toEqual(true)
    if (!Firebase.isSucceeded(res)) {
      throw new Error('Got an unexpected behavior')
    }
    const obj = res.right.value
    expect(obj.token.value).toEqual(tokenValue)
    expect(obj.user.userId).toStrictEqual({
      tag: 'UserId',
      value: userRecord.userId
    })
    expect(obj.user.name).toEqual(userRecord.name)
    expect(obj.user.avatarUrl).toEqual(userRecord.avatarUrl)
  })
  it('should be Left', () => {
    const resEmpty = Firebase.validate({})
    expect(Firebase.isFailed(resEmpty)).toEqual(true)

    const resLackOne = Firebase.validate({ token: tokenValue })
    expect(Firebase.isFailed(resLackOne)).toEqual(true)

    const resLackToken = Firebase.validate({ user: userRecord })
    expect(Firebase.isFailed(resLackToken)).toEqual(true)
  })
})
