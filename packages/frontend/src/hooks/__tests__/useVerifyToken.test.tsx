import * as React from 'react'
import useVerifyToken, { query } from '../useVerifyToken'
import { MockedProvider } from '@apollo/react-testing'
import { useLazyQuery } from '@apollo/react-hooks'
import waitForExpect from 'wait-for-expect'
import { renderHook, act } from '@testing-library/react-hooks'
import { cleanup } from '@testing-library/react'
import * as tv from '@partial-tube/domain/lib/Auth/TokenVerification'
import { isLeft } from 'fp-ts/lib/Either'

describe('useVerifyToken', () => {
  afterEach(cleanup)

  const VERIFY_RESPONSE = {
    verify: {
      __typename: 'User',
      userId: 'xxx-111',
      name: 'hogehoge',
      avatarUrl: 'http://hogehoge.com/hoge.jpg'
    }
  }
  const VERIFY_MOCKS = [
    {
      request: {
        query: query,
        variables: {}
      },
      result: { data: VERIFY_RESPONSE }
    }
  ]
  it('should work with graphql', async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MockedProvider mocks={VERIFY_MOCKS}>{children}</MockedProvider>
    )
    const { result } = renderHook(() => useLazyQuery(query), { wrapper })
    act(() => {
      result.current[0]()
    })
    await waitForExpect(() => {
      const res = result.current[1]
      expect(res.data).toStrictEqual(VERIFY_RESPONSE)
    }, 2000)
  })
  it('should work along the flow', async () => {
    const tokenValue = 'tokentokenaskjkasd238askgald8'

    window.localStorage.setItem('token', tokenValue)

    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MockedProvider mocks={VERIFY_MOCKS}>{children}</MockedProvider>
    )
    const { result } = renderHook(() => useVerifyToken(), { wrapper })

    expect(result.current.state).toStrictEqual(tv.createInit())

    act(() => {
      result.current.dispatcher()
    })
    if (isLeft(result.current.state))
      throw new Error('Got an unexpected behavior')

    expect(result.current.state.right).toStrictEqual(
      tv.TokenExisted.create({ value: tokenValue })
    )

    await waitForExpect(() => {
      // if (isLeft(result.current.state)) return
      expect(result.current.state).toStrictEqual(
        tv.validateUser(VERIFY_RESPONSE.verify)
      )
    }, 3000)
  })
})
