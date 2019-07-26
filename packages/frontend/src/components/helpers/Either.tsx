import { Either, isLeft } from 'fp-ts/lib/Either'

interface Props<E, A> {
  either: Either<E, A>
  left: (error: E) => JSX.Element
  right: (thing: A) => JSX.Element
}

export default <E, A>(props: Props<E, A>) =>
  isLeft(props.either)
    ? props.left(props.either.left)
    : props.right(props.either.right)
