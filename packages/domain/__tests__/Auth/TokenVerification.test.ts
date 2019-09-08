import * as tv from '../../src/Auth/TokenVerification'
import { isRight, isLeft } from 'fp-ts/lib/Either'

describe("Token's Verfiication", () => {
  it('should work on Token', () => {
    // a case failed
    const resEmpty = tv.validateToken('')
    expect(isLeft(resEmpty)).toEqual(true)
    if (isRight(resEmpty)) {
      throw new Error('Got an unexpected behavior')
    }
    expect(resEmpty.left).toStrictEqual(tv.TokenNotExisted.create())
    expect(tv.isFailed(resEmpty)).toEqual(true)

    // a case succeeded
    const tokenStr = 'hiaosjfkjksaaa'
    const res = tv.validateToken(tokenStr)
    expect(isRight(res)).toEqual(true)
    if (isLeft(res)) {
      throw new Error('Got an unexpected behavior')
    }
    expect(res.right).toStrictEqual({
      tag: 'TokenExisted',
      token: { value: tokenStr }
    })
    expect(tv.isWithToken(res)).toEqual(true)
  })
  it('should be Left on User', () => {
    const resEmpty = tv.validateUser({})
    expect(isLeft(resEmpty)).toEqual(true)
    if (isRight(resEmpty)) {
      throw new Error('Got an unexpected behavior')
    }
    expect(resEmpty.left).toStrictEqual(tv.InvalidTokenError.create())
    expect(tv.isFailed(resEmpty)).toEqual(true)
  })
  it('should be Right on User', () => {
    const inputUser = {
      userId: 'xxx1111',
      name: 'hogehoge',
      avatarUrl: 'http://hogehoge.com/hoge.jpg'
    }

    const res = tv.validateUser(inputUser)

    expect(isRight(res)).toEqual(true)
    if (isLeft(res)) {
      throw new Error('Got an unexpected behavior')
    }
    expect(res.right).toStrictEqual({
      tag: tv.Success.tag,
      user: {
        userId: {
          tag: 'UserId',
          value: inputUser.userId
        },
        name: inputUser.name,
        avatarUrl: inputUser.avatarUrl
      }
    })
  })
})
