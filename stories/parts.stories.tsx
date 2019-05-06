import * as React from "react"
import { storiesOf } from "@storybook/react"
import Button from "../src/components/parts/Button"
import Header from "../src/components/parts/Header"

storiesOf("parts", module).add("Button", () => <Button />)
storiesOf("parts/Header", module).add("default", () => <Header />)
