import React, { ReactElement } from "react"
import { NextComponentType, NextPageContext } from "next"
import { useFirebaseAuth } from "../hooks/useFirebaseAuth"
import * as User from "../models/User"
import { addSession } from "../middlewares/addSession"
import { IncomingMessage } from "http"

type RequestWithSession = IncomingMessage & {
  session?: {
    user: User.Model
  }
}
type Props = {
  [key: string]: any
}

export const withAuth = (
  // TODO: reconsider this type safety around "any" below, I got lots of errors so far...
  PageComponent: NextComponentType<NextPageContext, any, any>,
) => {
  const withAuthComponent = ({ authUser, ...otherProps }: Props) => {
    return (
      <AuthComponent>
        <PageComponent {...otherProps} />
      </AuthComponent>
    )
  }

  withAuthComponent.getInitialProps = async (ctx: NextPageContext) => {
    const { req, res } = ctx
    console.log("getInitProps in withAuth!!!!!")

    let authUser = null
    if (typeof window === "undefined" && typeof req !== "undefined") {
      addSession(req, res)
      const actualReq = (req as unknown) as RequestWithSession
      authUser = actualReq.session?.user
      console.log("SSR IN WITH AUTH", authUser)
    }

    let pageComponentProps = {}
    if (PageComponent.getInitialProps) {
      pageComponentProps = await PageComponent.getInitialProps(ctx)
    }

    return {
      ...pageComponentProps,
      authUser,
    }
  }
  return withAuthComponent
}

// might be unnecessary...!?
const AuthComponent: React.FC<{}> = ({ children }) => {
  const auth = useFirebaseAuth()

  return React.cloneElement(children as ReactElement, { fbAuth: auth })
}
