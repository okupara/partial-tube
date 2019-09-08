import React from 'react'
import * as Headers from 'components/organisms/Headers'
// import { ErrorTypes, isNetworkError } from '@partial-tube/domain/lib/Auth'

type Props = {
  // error: ErrorTypes
  signIn: () => void
}

const Errors = (props: Props) => (
  console.log('ERRROR'),
  (
    <div>
      <Headers.NotSigned signIn={props.signIn} />
      {/* {isNetworkError(props.error) && <NetworkError />} */}
    </div>
  )
)

// const NetworkError = () => <div>Your network seems not connected.</div>

export default Errors
