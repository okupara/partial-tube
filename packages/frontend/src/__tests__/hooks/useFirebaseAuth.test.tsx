// import firebase from 'firebase'
// import * as m from '__mocks__/Firebase'
// import { renderHook } from '@testing-library/react-hooks'
// import { wait } from '@testing-library/react'
// import useFirebaseAuth from 'hooks/useFirebaseAuth'
// import { isRight } from 'fp-ts/lib/Either'
// import { Success, InProgress } from '@partial-tube/domain/lib/Auth/Firebase'

// describe('useFirebaseAuth', () => {
//   let stub: ReturnType<typeof jest.spyOn>
//   const setup = (mock: {}) => {
//     stub = jest.spyOn(firebase, 'auth')
//     stub.mockImplementation(() => {
//       return mock as any
//     })
//   }
//   it('should be success when a user already logged in', async () => {
//     setup(m.AuthedMock)
//     const { result } = renderHook(() => useFirebaseAuth())
//     expect(isRight(result.current.state)).toEqual(true)
//     if (!isRight(result.current.state)) throw new Error('An unexpected value')
//     expect(result.current.state.right.tag).toEqual(InProgress.tag)

//     await wait(
//       () => {
//         if (!isRight(result.current.state))
//           throw new Error('An unexpected value')
//         expect(result.current.state.right.tag).toEqual(Success.tag)
//       },
//       { timeout: 2000 }
//     )
//   })
//   it('should be success when it gets redirected', async () => {
//     setup(m.RedirectedMock)
//     const { result } = renderHook(() => useFirebaseAuth())
//     expect(isRight(result.current.state)).toEqual(true)
//     if (!isRight(result.current.state)) throw new Error('An unexpected value')
//     expect(result.current.state.right.tag).toEqual(InProgress.tag)

//     await wait(
//       () => {
//         if (!isRight(result.current.state))
//           throw new Error('An unexpected value')
//         expect(result.current.state.right.tag).toEqual(Success.tag)
//       },
//       { timeout: 2000 }
//     )
//   })
// })
