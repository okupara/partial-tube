// import * as React from 'react'
// import { render, wait } from '@testing-library/react'
// import { renderHook, act } from '@testing-library/react-hooks'
// import * as M from 'containers/videos/model'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { MockedProvider } from '@apollo/react-testing'
// import { WrapperProps } from '../helper'
// import Videos from 'containers/Videos'
// import * as E from 'fp-ts/lib/Either'
// import omit from 'lodash-es/omit'

// describe('Videos', () => {
//   const date = new Date()
//   const timesec = date.getTime()
//   const RESPONSE = {
//     getVideos: {
//       items: [
//         {
//           id: 'randomhogehogeggg',
//           userId: 'hogeaaaaka1',
//           title: 'title hoge',
//           description: 'description hogee',
//           start: 3,
//           end: 8,
//           videoId: 'hogeogo',
//           created: new Date(timesec - 10000).toUTCString(),
//           order: 1
//         }
//       ]
//     }
//   }
//   const MOCKS = [
//     {
//       request: {
//         query: M.query,
//         variables: {}
//       },
//       result: { data: RESPONSE }
//     }
//   ]
//   it('should be Right with the RESPONSE variable', () => {
//     const res = M.PartialVideoCollection.create(RESPONSE.getVideos)
//     expect(E.isRight(res)).toEqual(true)
//   })
//   it('should compile gql without errors', async () => {
//     const { result } = renderHook(() => useLazyQuery(M.query), {
//       wrapper: (props: WrapperProps) => (
//         <MockedProvider mocks={MOCKS} addTypename={false}>
//           {props.children}
//         </MockedProvider>
//       )
//     })
//     act(() => {
//       result.current[0]()
//     })
//     await wait(() => {
//       expect(result.current[1].data).toStrictEqual({
//         getVideos: {
//           items: RESPONSE.getVideos.items.map(v => omit(v, 'userId'))
//         }
//       })
//     })
//   })
//   it('should render the component correctly', async () => {
//     const { container } = render(<Videos />, {
//       wrapper: (props: WrapperProps) => (
//         <MockedProvider mocks={MOCKS} addTypename={false}>
//           {props.children}
//         </MockedProvider>
//       )
//     })
//     expect(container).toHaveTextContent('waiting')

//     await wait(() => {
//       expect(container).toHaveTextContent('success')
//     })
//   })
// })
