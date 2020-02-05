// import React from 'react'
// import { cleanup } from '@testing-library/react'
// import { renderHook, act } from '@testing-library/react-hooks'
// import '@testing-library/jest-dom/extend-expect'
// import { MockedProvider } from '@apollo/react-testing'
// import useStateAddVideo, { query } from 'hooks/useVideoChecker'
// import waitForExpect from 'wait-for-expect'
// import * as AddVideo from '@partial-tube/domain/lib/workflow/AddVideo'

// describe('AddVideoForm', () => {
//   afterEach(cleanup)

//   it('should succeed with async', async () => {
//     const YOUTUBE_NORMAL_RESPONSE = {
//       checkVideoExistance: {
//         __typename: 'YTVideoResult',
//         items: [
//           {
//             __typename: 'YTVideo',
//             id: 'hogehoge',
//             snippet: {
//               __typename: 'YTVideoSnippet',
//               title: 'jingi-naki-war',
//               description: "that's a serious movie"
//             }
//           }
//         ]
//       }
//     }
//     const YOUTUBE_MOCKS = [
//       {
//         request: {
//           query,
//           variables: { videoId: 'hoge', apiKey: '' } // doesn't use webpack when testing...
//         },
//         result: { data: YOUTUBE_NORMAL_RESPONSE }
//       }
//     ]
//     const wrapper = ({ children }: { children: JSX.Element }) => (
//       <MockedProvider mocks={YOUTUBE_MOCKS}>{children}</MockedProvider>
//     )
//     const { result } = renderHook(() => useStateAddVideo(), { wrapper })
//     expect(result.current.state).toEqual(AddVideo.createNeverLoadedVideo())

//     act(() => {
//       result.current.dispatcher('hoge')
//     })

//     await waitForExpect(() => {
//       expect(result.current.state).toStrictEqual(AddVideo.createExistedVideo())
//     }, 2000)
//   })
// })
