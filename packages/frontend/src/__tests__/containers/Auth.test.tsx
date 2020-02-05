// // import * as React from "react"
// import * as React from 'react'
// import { MockedProvider } from '@apollo/react-testing'
// import { useMutation } from '@apollo/react-hooks'
// import { query } from 'containers/Auth'
// import { renderHook, act } from '@testing-library/react-hooks'
// import { render } from '@testing-library/react'
// import { wait, cleanup } from '@testing-library/react'
// import { WrapperProps } from '../helper'
// import * as depFirebase from '../../hooks/useFirebaseAuth'
// import * as FB from '@partial-tube/domain/lib/Auth/Firebase'
// import * as ET from 'fp-ts/lib/Either'
// import Auth from 'containers/Auth'
// import '@testing-library/jest-dom/extend-expect'

// jest.mock('../../hooks/useFirebaseAuth')

// // creates the mock the case of succeeded
// const mockState = FB.validate({
//   token: 'akdjfakj',
//   user: {
//     userId: 'aa1',
//     name: 'hoge',
//     avatarUrl: 'https://hoge.com/hoge.png'
//   }
// })

// // should be Success state value
// if (ET.isLeft(mockState)) throw new Error('an unexpected error occured')
// if (!FB.isSucceeded(mockState)) throw new Error('an unexpected error occured')

// const mockDependency = depFirebase as jest.Mocked<typeof depFirebase>
// mockDependency.default.mockImplementation(() => ({
//   state: mockState,
//   loginDispatcher: () => {}
// }))

// afterEach(cleanup)

// describe('useSaveLogin', () => {
//   const RESPONSE = {
//     saveUserInfo: null,
//     saveToken: null
//   }
//   const MOCKS = [
//     {
//       request: {
//         query,
//         variables: {
//           user: {
//             userId: 'aa1',
//             name: 'hoge',
//             avatarUrl: 'https://hoge.com/hoge.png'
//           },
//           token: 'akdjfakj'
//         }
//       },
//       result: { data: RESPONSE }
//     }
//   ]
//   it('should be work with the query', async () => {
//     const { result } = renderHook(() => useMutation(query), {
//       wrapper: (props: WrapperProps) => (
//         <MockedProvider mocks={MOCKS}>{props.children}</MockedProvider>
//       )
//     })

//     act(() => {
//       result.current[0]({ variables: MOCKS[0].request.variables })
//     })

//     await wait(() => {
//       expect(result.current[1].data).toEqual(RESPONSE)
//     })
//   })
//   it("should start request saving user info when Firebase's state is success", async () => {
//     const { container } = render(
//       <>
//         <MockedProvider mocks={MOCKS}>
//           <Auth
//             waiting={() => <div>waiting...</div>}
//             success={() => <div>success</div>}
//             failed={() => <div>error</div>}
//           ></Auth>
//         </MockedProvider>
//       </>
//     )

//     await wait(() => {
//       expect(container).toHaveTextContent('success')
//     })
//     expect(true).toEqual(true)
//   })
// })
