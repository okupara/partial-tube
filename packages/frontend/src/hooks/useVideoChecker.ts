import { useRef } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import gql from 'graphql-tag'
import * as Add from '@partial-tube/domain/lib/workflow/AddVideo'

type QueryParams = {
  videoId: string
  apiKey: string
}
type Video = {
  id: string
  snippet: {
    title: string
    description: string
  }
}
type QueryData = {
  checkVideoExistance: {
    items: Video[]
  }
}

export const query = gql`
  query VideoExsitance($videoId: String!, $apiKey: String!) {
    checkVideoExistance(videoId: $videoId, apiKey: $apiKey)
      @rest(path: "/videos?id={args.videoId}&part=snippet&key={args.apiKey}") {
      items {
        id
        snippet {
          title
          description
        }
      }
    }
  }
`
// TODO: Test
const validateUrlExisted = (result: QueryResult): Add.ExistedVideo => {
  if (result.called === false && result.loading === false) {
    return Add.createNeverLoadedVideo()
  }
  if (result.error) {
    return Add.createNetworkError()
  }
  // when loading??
  return Add.validateGqlVideo(result.data.checkVideoExistance)
}

const StateAddVideo = () => {
  const ref = useRef('')
  const [execute, res] = useLazyQuery<QueryData, QueryParams>(query)

  const dispatcher = (videoId: string) => {
    if (ref.current === videoId) return
    execute({
      variables: {
        videoId,
        apiKey: process.env.YOUTUBE ? process.env.YOUTUBE : ''
      }
    })
    ref.current = videoId
  }
  const state = validateUrlExisted(res)

  return {
    dispatcher,
    state
  }
}

export default StateAddVideo
