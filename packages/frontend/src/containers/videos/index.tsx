// import * as React from 'react'
// import { useLazyQuery } from '@apollo/react-hooks'
// import * as AS from '@partial-tube/domain/lib/ApolloState'
// import * as O from 'fp-ts/lib/Option'
// import { pipe } from 'fp-ts/lib/pipeable'
// import * as M from './model'

// const Videos = () => {
//   const [dispatcher, result] = useLazyQuery(M.query)

//   const state = AS.toState<M.VideoCollection>({
//     waiting: result.loading,
//     error: result.error,
//     data: pipe(
//       O.fromNullable(result.data),
//       O.fold<M.UnvalidatedData, AS.IOResult<M.VideoCollection> | null>(
//         () => null,
//         a => M.VideoCollection.decode(a.getVideos)
//       )
//     )
//   })

//   React.useEffect(() => {
//     dispatcher({})
//   }, [])

//   return AS.match(state, {
//     error: () => <div>error</div>,
//     waiting: () => <div>waiting</div>,
//     success: value => <div>success</div>
//   })
// }

// export default Videos
