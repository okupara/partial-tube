import * as User from '../src/User'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('User', () => {
  it('should be Left when an empty object comes', () => {
    const res = User.create({})
    expect(isLeft(res)).toEqual(true)
  })
  it('should be Left when an unexpected object comes', () => {
    const res = User.create({
      userId: 'hogehoge'
    })
    expect(isLeft(res)).toEqual(true)
  })
  it('should be Right when an expected object comes', () => {
    const dummyUser = {
      userId: 'kjsakjfdakjsd-111',
      name: 'Jimi Hendrix',
      avatarUrl: 'http://hoge.com/img/jimi'
    }
    const res = User.create(dummyUser)
    expect(isRight(res)).toEqual(true)
    if (!isRight(res)) {
      throw new Error('We got an unexpected value...')
    }
    expect(res.right.userId).toStrictEqual({
      tag: 'UserId',
      value: 'kjsakjfdakjsd-111'
    })
    expect(res.right.name).toEqual('Jimi Hendrix')
    expect(User.encode(res.right)).toStrictEqual(dummyUser)
  })
  it('should be Right when an extended object comes', () => {
    const res = User.create({
      userId: 'xxxx1111xxxx',
      name: 'Jimi Hendrix',
      avatarUrl: 'http://hogehoge.com/hogehoge',
      __typename: 'User' // extended field
    })
    expect(isRight(res)).toEqual(true)
  })
})
