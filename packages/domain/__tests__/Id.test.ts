import * as id from '../src/Id'
import { isRight, isLeft } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

describe('Id', () => {
  type TagHoge = {
    tag: 'Hoge'
  }
  type HogeId = TagHoge & id.BaseStringId
  const HogeId = id.createIdType<HogeId>(value => ({ tag: 'Hoge', value }))

  it('should be Right', () => {
    const res = HogeId.decode('xxxx111-1111')
    expect(isRight(res)).toEqual(true)
    if (isLeft(res)) {
      throw new Error('an unexpected behaviour')
    }
    expect(res.right).toStrictEqual({ tag: 'Hoge', value: 'xxxx111-1111' })
    // encode: {idobj} -> "id string"
    expect(HogeId.encode(res.right)).toEqual('xxxx111-1111')
  })
  it('should be Left', () => {
    const res = HogeId.decode('')
    expect(isLeft(res)).toEqual(true)

    const userRuntimeType = t.type({ userId: HogeId, name: t.string })
    const resEmptyUser = userRuntimeType.decode({})
    expect(isLeft(resEmptyUser)).toEqual(true)

    const resNullUserId = userRuntimeType.decode({
      userId: null,
      name: 'hhoho'
    })
    expect(isLeft(resNullUserId)).toEqual(true)
  })
})
