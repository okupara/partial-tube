import React from 'react'
import {
  Signed as SignedHeader,
  SignedProps as SignedHeaderProps
} from 'components/organisms/Headers'

type Props = SignedHeaderProps

const AddVideo = (props: Props) => (
  <div>
    <SignedHeader signOut={props.signOut} />
  </div>
)

export default AddVideo
