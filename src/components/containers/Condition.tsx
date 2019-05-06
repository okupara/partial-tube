interface Props {
  cond: boolean
  valid: JSX.Element
  invalid: JSX.Element
}

export default (props: Props) => (props.cond ? props.valid : props.invalid)
