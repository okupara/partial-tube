import * as User from '../src/User'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('User', () => {
  it('should be Left when an empty object comes', () => {
    const res = User.create({})
    expect(isLeft(res)).toEqual(true)
  })
  it('should be Right when an extended object comes', () => {
    const res = User.create({
      name: 'Jimi Hendrix',
      avatarUrl: 'http://hogehoge.com/hogehoge',
      __typename: 'User' // extended field
    })
    expect(isRight(res)).toEqual(true)
  })
})
