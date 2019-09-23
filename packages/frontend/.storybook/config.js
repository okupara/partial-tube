import * as React from 'react'
import { configure, addDecorator } from '@storybook/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalCss from '../src/GlobalCss'
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
const req = require.context('../src/stories', true, /\.stories\.tsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

addDecorator(s => {
  return (
    <>
      <CssBaseline />
      <GlobalCss />
      {s()}
    </>
  )
})
