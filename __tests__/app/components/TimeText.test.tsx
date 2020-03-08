import React from "react"
import { render } from "@testing-library/react"
import TimeText from "../../../src/app/components/molecules/TimeText"
import "@testing-library/jest-dom/extend-expect"

describe("TimeText", () => {
  it("renders formatted text", () => {
    const { container } = render(<TimeText sec={80} />)
    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent("01:20")
  })
})
