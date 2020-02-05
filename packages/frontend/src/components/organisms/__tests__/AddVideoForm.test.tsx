// import * as React from 'react'
// import {
//   createNeverLoadedVideo,
//   createExistedVideo
// } from '@partial-tube/domain/lib/workflow/AddVideo'
// import { render } from '@testing-library/react'
// import AddVideoForm from '../AddVideoForm'
// import '@testing-library/jest-dom/extend-expect'
// import { renderHook } from '@testing-library/react-hooks'

// describe('AddVideoForm', () => {
//   it('should render with the initial state', () => {
//     const { result } = renderHook(() =>
//       React.useRef<HTMLDivElement | null>(null)
//     )

//     const { getByLabelText, queryByLabelText } = render(
//       <AddVideoForm
//         searchDispatcher={() => {}}
//         videoExistance={createNeverLoadedVideo()}
//         currentPlayerTime={0}
//         refForYoutube={result.current}
//       />
//     )
//     const input = getByLabelText('test')
//     expect(input).toBeTruthy()
//     const description = queryByLabelText('description')
//     expect(description).toBeFalsy()
//   })
//   it('should render extra forms when valid youtube url comes', () => {
//     const { result } = renderHook(() =>
//       React.useRef<HTMLDivElement | null>(null)
//     )
//     const { getByLabelText } = render(
//       <AddVideoForm
//         searchDispatcher={() => {}}
//         videoExistance={createExistedVideo()}
//         currentPlayerTime={0}
//         refForYoutube={result.current}
//       />
//     )
//     const target = getByLabelText('Description')
//     expect(target).toBeTruthy()
//   })
// })
