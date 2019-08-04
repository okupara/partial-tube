import { Tags, Type } from '@partial-tube/domain/lib/State'

interface Props<E, T> {
  state: Type<E, T>
  init?: () => JSX.Element
  waiting?: () => JSX.Element
  error?: (e: E) => JSX.Element
  done?: (t: T) => JSX.Element
}

export default <E, T>(props: Props<E, T>): JSX.Element | null => {
  switch (props.state.tag) {
    case Tags.Init:
    default:
      return props.init ? props.init() : null
    case Tags.Waiting:
      return props.waiting ? props.waiting() : null
    case Tags.Error:
      return props.error ? props.error(props.state.error) : null
    case Tags.Done:
      return props.done ? props.done(props.state.result) : null
  }
}
