import * as React from "react"
// import { render, fireEvent } from "react-testing-library"
import { mount } from "enzyme"
import App from "./App"

describe("TestComponent", () => {
  it("just rendering without error", () => {
    const mounted = mount(<App />)
    const btn = mounted.find("button")
    btn.simulate("click")
    console.log(mounted.find("h2").text())
    // const { getByText, getByTestId } = render(<App />)
    // const bt = getByText("+")
    // fireEvent.click(bt)
    // fireEvent.click(bt)
    // const result = getByTestId("foobar")
    // console.log(result.textContent)
  })
})
