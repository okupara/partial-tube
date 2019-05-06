import * as React from "react"
import { storiesOf } from "@storybook/react"
import { SpecialButton, NormalButton } from "../src/components/parts/Button"
import Header from "../src/components/parts/Header"
import {
  UnAuthenticatedMock,
  AuthenticatedMock
} from "../mock/AuthenticationMock"

storiesOf("parts/Button", module)
  .add("special", () => <SpecialButton />)
  .add("normal", () => <NormalButton>Login</NormalButton>)

storiesOf("parts/Header", module)
  .add("default", () => <Header authentication={UnAuthenticatedMock} />)
  .add("authenticated", () => <Header authentication={AuthenticatedMock} />)
