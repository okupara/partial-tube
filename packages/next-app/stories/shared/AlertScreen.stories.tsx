import * as React from "react"
import { MarginDecorator } from "../Decorators"
import { ErrorScreen } from "../../src/components/shared/ErrorScreen"
import { UnAuthenticated } from "../../src/components/auth/UnAuthenticated"
import { ContentBox } from "../../src/components/shared/ContentBox"

export const errorScreen = () => <ErrorScreen title="Permission denined." />
errorScreen.story = {
  name: "errorScreen",
}

export const errorScreenWithHeader = () => (
  <UnAuthenticated>
    <ContentBox>
      <ErrorScreen title="Permission denined." />
    </ContentBox>
  </UnAuthenticated>
)
errorScreenWithHeader.story = {
  name: "errorScreenWithHeader",
}

export default {
  title: "Parts",
  decorators: [MarginDecorator],
}
