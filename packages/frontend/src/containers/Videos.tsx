import * as React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { match } from '@partial-tube/domain/lib/ApolloState'
import { Videos as VideosModel } from '@partial-tube/domain/lib/Videos'
import * as AS from "@partial-tube/domain/lib/ApolloState"
import * as O from "fp-ts/lib/Option"
import {pipe} from "fp-ts/lib/pipeable"

export const query = gql`
  query {
    getVideos {
      id
      title
      description
      playranges {
        start
        end
      }
      videoId
    }
  }
`
export type ResponseData = {
  getVideos: VideosModel.Type
}


const Videos = () => {
  const [dispatcher, result] = useLazyQuery(query)
  
  const state = AS.toState<VideosModel.Type>({
    waiting: result.loading,
    error: result.error,
    validate: VideosModel.create,
    data: pipe(
      O.fromNullable(result.data),
      O.fold<ResponseData, VideosModel.Type | null>(() => null, a => a.getVideos)
    )
  })

  React.useEffect(() => {
    dispatcher({})
  }, [])

  return match<VideosModel.Type, JSX.Element>(state, {
    error: () => <div>error</div>,
    waiting: () => (console.log('waiting'), <div>waiting</div>),
    success: (value) => (console.log('success', value), <div>success</div>)
  })
}

export default Videos
