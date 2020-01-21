import * as React from "react"
import Button from "components/molecules/LoginButton"
import {render} from "@testing-library/react";

describe("hoge", () => {
    it("hogo", () => {
        const {getByText} = render(<Button />)
        expect(getByText("Login")).toBeTruthy();
    })
})
