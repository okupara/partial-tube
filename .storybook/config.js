import { configure } from "@storybook/react"

// with Enzyme
// import { configure as configureEnzyme } from "enzyme"
// import Adapter from "enzyme-adapter-react-16"

// configureEnzyme({ adapter: new Adapter() })
// with RTL
// import expect from "expect"
// console.log(expect)
// window.expect = expect
// require("jest-dom/extend-expect")
// import "react-testing-library/cleanup-after-each"

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.tsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
