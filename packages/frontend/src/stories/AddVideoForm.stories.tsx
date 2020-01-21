import * as React from 'react'
import AddVideoForm from 'components/organisms/AddVideoForm'
import * as Add from '@partial-tube/domain/lib/workflow/AddVideo'
import useYoutube from 'hooks/useYoutube'

type Props = {
  videoExistance: Add.ExistedVideo
}
const AddVideoWithRef = (props: Props) => {
  const res = useYoutube()
  React.useEffect(() => {
    res.loadVideo('wHCo0Iwra0I')
  }, [res.loadVideo])

  return (
    <AddVideoForm
      refForYoutube={res.refDiv}
      currentPlayerTime={320.23}
      searchDispatcher={(v: string) => {
        console.log(`SEARCH: ${v}`)
      }}
      videoExistance={props.videoExistance}
    />
  )
}

export const withoutVideo = () => (
  <AddVideoWithRef videoExistance={Add.createNeverLoadedVideo()} />
)
export const withVideo = () => (
  <AddVideoWithRef videoExistance={Add.createExistedVideo()} />
)

export default {
  title: 'Add'
}
