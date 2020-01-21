import * as React from 'react'
import Video from 'components/molecules/Video'
import ListView from 'components/organisms/ListView'
import { serializedCollection, serializedVideo } from '__mocks__/Videos'

export const video = () => <Video video={serializedVideo} />
export const videos = () => (
  <ListView
    list={serializedCollection.items}
    itemRender={v => <Video video={v} />}
  />
)

export default {
  title: 'organisms/Video',
  component: Video
}
