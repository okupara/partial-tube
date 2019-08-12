import React from 'react'
import { Default as DefaultHeader } from 'components/organisms/Headers'

interface State {
  isError: boolean
}

interface Props {
  children: JSX.Element
}
// There's still no way to use the feature `getDerivedStateFromError` with react-hooks.
class DefaultErrorBoundary extends React.Component<Props> {
  state: State = {
    isError: false
  }
  static getDerivedStateFromError(_: Error): State {
    return { isError: true }
  }
  render() {
    const { isError } = this.state
    const { children } = this.props

    return isError ? (
      <>
        <DefaultHeader />
        <div>There&lsquo;s something wrong...</div>
      </>
    ) : (
      children
    )
  }
}

export default DefaultErrorBoundary
