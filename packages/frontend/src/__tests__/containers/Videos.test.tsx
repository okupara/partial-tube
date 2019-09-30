import * as React from 'react'
import { render, wait } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { query } from 'containers/Videos'
import { useLazyQuery } from '@apollo/react-hooks'
import { MockedProvider } from '@apollo/react-testing'
import { WrapperProps } from '../helper'
import Videos from 'containers/Videos'
import {Videos as VideosModel} from "@partial-tube/domain/lib/Videos"
import * as E from "fp-ts/lib/Either"

describe('Videos', () => {
  const RESPONSE = {
    getVideos: [{
      id: 'randomhogehoge',
      title: 'title hoge',
      description: 'description hogee',
      playranges: [{ start: 2, end: 8 }, { start: 12, end: 32 }],
      videoId: 'hogeogo'
    }]
  }
  const MOCKS = [
    {
      request: {
        query,
        variables: {}
      },
      result: { data: RESPONSE }
    }
  ]
  it("should be Right with the RESPONSE variable", () => {
    const res = VideosModel.create(RESPONSE.getVideos)
    expect(E.isRight(res)).toEqual(true)
  })
  it('should compile gql without errors', async () => {
    const { result } = renderHook(() => useLazyQuery(query), {
      wrapper: (props: WrapperProps) => (
        <MockedProvider mocks={MOCKS} addTypename={false}>
          {props.children}
        </MockedProvider>
      )
    })
    act(() => {
      result.current[0]()
    })
    console.log(result.current[1].loading)
    await wait(() => {
      expect(result.current[1].data).toStrictEqual(RESPONSE)
    })
  })
  it('', async () => {
    const { container } = render(<Videos />, {
      wrapper: (props: WrapperProps) => (
        <MockedProvider mocks={MOCKS} addTypename={false}>
          {props.children}
        </MockedProvider>
      )
    })
    expect(container).toHaveTextContent('waiting')

    await wait(
      () => {
        expect(container).toHaveTextContent('success')
      },
      { interval: 8 }
    )
  })
})
