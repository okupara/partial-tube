import React from "react"
import Link from "next/link"

type Props = {
  pathname?: string
}

const Header: React.FC<Props> = ({ pathname }) => (
  <header>
    <Link href="/">
      <a className={pathname === "/" ? "is-active" : ""}>Home</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>About</a>
    </Link>
  </header>
)

export default Header
