import * as React from "react"
import Header from "components/organisms/Header"
import {unAuthedMock} from "@partial-tube/domain/lib/Mock"

export default () => <Header auth={unAuthedMock}/>
