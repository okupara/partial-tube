// import * as React from 'react'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { match, IOResult } from '@partial-tube/domain/lib/ApolloState'
// import * as M from 'containers/videos/model'
// import * as AS from '@partial-tube/domain/lib/ApolloState'
// import * as O from 'fp-ts/lib/Option'
// import { pipe } from 'fp-ts/lib/pipeable'

// const Videos = () => {
//   const [dispatcher, result] = useLazyQuery(M.query)

//   const state = AS.toState<M.VideoCollection>({
//     waiting: result.loading,
//     error: result.error,
//     data: pipe(
//       O.fromNullable(result.data),
//       O.fold<M.UnvalidatedData, IOResult<M.VideoCollection> | null>(
//         () => null,
//         a => M.VideoCollection.decode(a)
//       )
//     )
//   })

//   React.useEffect(() => {
//     dispatcher({})
//   }, [])

//   return match<M.VideoCollection, JSX.Element>(state, {
//     error: () => <div>error</div>,
//     waiting: () => (console.log('waiting'), <div>waiting</div>),
//     success: value => (console.log('success', value), <div>success</div>)
//   })
// }

// export default Videos
