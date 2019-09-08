import * as fb from '../../src/Auth/Firebase'
import * as token from '../../src/Auth/TokenVerification'
import * as auth from '../../src/Auth/index' // TODO: rename

describe('Auth', () => {
  it('should be failed', () => {
    const fbInit = fb.createInProgress()
    const tokenInit = token.createInit()
    const authState1 = auth.makeCurrentState({
      fbState: fbInit,
      tokenState: tokenInit
    })
    expect(authState1).toStrictEqual(auth.Waiting.create())

    const fbFailed = fb.createFailed()
    const authState2 = auth.makeCurrentState({
      fbState: fbFailed,
      tokenState: tokenInit
    })
    expect(authState2).toStrictEqual(auth.Waiting.create())

    const tokenFailed = token.createInvalidTokenError()
    const authState3 = auth.makeCurrentState({
      fbState: fbFailed,
      tokenState: tokenFailed
    })
    expect(authState3).toStrictEqual(auth.Failed.create())
  })
  it('should be Success', () => {
    // failed fb auth
    const fbInit = fb.createInProgress()
    const tokenInit = token.createInit()
    const authState1 = auth.makeCurrentState({
      fbState: fbInit,
      tokenState: tokenInit
    })
    expect(authState1).toStrictEqual(auth.Waiting.create())

    // but succeeded to get token
    const gotTokenState = token.validateToken('dummy-token-value')
    const authState2 = auth.makeCurrentState({
      fbState: fbInit,
      tokenState: gotTokenState
    })
    expect(authState2).toStrictEqual(auth.Waiting.create())

    // and the token pass the verifying
    const user = {
      userId: 'xxx-111',
      name: 'hooo',
      avatarUrl: 'http://www.hogehoge.com/hoge.png'
    }
    const tokenSuccess = token.validateUser(user)
    const authState3 = auth.makeCurrentState({
      fbState: fbInit,
      tokenState: tokenSuccess
    })
    expect(authState3).toStrictEqual(
      auth.Success.create({
        userId: { tag: 'UserId', value: user.userId },
        name: user.name,
        avatarUrl: user.avatarUrl
      })
    )
  })

  it('should be Success when firebase auth succeeded', () => {
    const fbSuccess = fb.validate({
      token: 'hohohoh',
      user: {
        userId: 'xxx-11',
        name: 'hogeo',
        avatarUrl: 'http://hogehoge.com/hoge.jpg'
      }
    })
    const tokenInit = token.createInit()
    const authState = auth.makeCurrentState({
      fbState: fbSuccess,
      tokenState: tokenInit
    })
    expect(authState.tag).toEqual(auth.Success.tag)
  })
})
