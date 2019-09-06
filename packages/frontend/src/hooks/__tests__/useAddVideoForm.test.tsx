import * as React from 'react'
import useAddVideoForm, { query } from '../useAddVideoForm'
import { MockedProvider } from '@apollo/react-testing'
import { renderHook, act } from '@testing-library/react-hooks'
import waitForExpect from 'wait-for-expect'

describe('AddVideoForm', () => {
  it('should add a new video', async () => {
    const input = {
      name: 'foooo',
      age: 24
    }

    const ADD_VIDEO_RESPONSE = {
      addVideo: {
        __typename: 'AddedVideo',
        id: 'fugabuuuu'
      }
    }
    const ADD_VIDEO_MOCKS = [
      {
        request: {
          query,
          variables: input
        },
        result: () => ({ data: ADD_VIDEO_RESPONSE })
      }
    ]
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MockedProvider mocks={ADD_VIDEO_MOCKS} addTypename={false}>
        {children}
      </MockedProvider>
    )
    const { result } = renderHook(() => useAddVideoForm(), { wrapper })
    act(() => {
      result.current.dispatcher({ variables: { ...input } })
    })
    await waitForExpect(() => {
      expect(result.current.result.data).toBeTruthy()
    }, 5000)
  })
})
