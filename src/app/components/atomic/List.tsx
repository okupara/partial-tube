import React from "react"

type Props<T> = {
  list: ReadonlyArray<T>
  component: (elem: T) => React.ReactNode
}

const List = <T extends {}>(props: Props<T>) => props.list.map(a => props.component(a))

export default List
