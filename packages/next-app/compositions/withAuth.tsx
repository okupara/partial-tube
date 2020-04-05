import React, { ReactElement } from "react"
import { NextComponentType, NextPageContext } from "next"
// import { useFirebaseAuth } from "../hooks/useFirebaseAuth"
import {
  initUser,
  LoginUserProvider,
} from "@partial-tube/core/lib/contexts/LoginUser"
import { useFirebaseAuth } from "../hooks/useFirebaseAuth"
// import { InitializingApp } from "@partial-tube/core/lib/layouts/InitializingApp"
// import { NeedLogin } from "@partial-tube/core/lib/layouts/NeedLogin"
// import { Authenticated } from "@partial-tube/core/lib/components/Authenticated"
import * as User from "@partial-tube/core/lib/models/User"
import { addSession } from "../middlewares/addSession"
import { IncomingMessage } from "http"

// type InitialProps = {
//   authUser: User.Model | null
// }

// type Props = {
//   [key: string]: any
// } & InitialProps

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
  const withAuthComponent = ({ authUser, ...otherProps }: Props) => (
    <LoginUserProvider value={authUser ? initUser(authUser) : initUser()}>
      <AuthComponent>
        <PageComponent {...otherProps} />
      </AuthComponent>
    </LoginUserProvider>
  )

  withAuthComponent.getInitialProps = async (ctx: NextPageContext) => {
    const { req, res } = ctx
    console.log("SSR in withAuth!!!!!")

    if (typeof window === "undefined" && typeof req !== "undefined") {
      addSession(req, res)
      const actualReq = (req as unknown) as RequestWithSession
      const authUser = actualReq.session?.user
      console.log("SSR I W----", authUser)

      let pageComponentProps = {}
      if (PageComponent.getInitialProps) {
        pageComponentProps = await PageComponent.getInitialProps(ctx)
      }
      return {
        ...pageComponentProps,
        authUser: authUser ? authUser : null,
      }
    }
    return {
      authUser: null,
    }
  }
  return withAuthComponent
}

const AuthComponent: React.FC<{}> = ({ children }) => {
  const auth = useFirebaseAuth()

  return React.cloneElement(children as ReactElement, { fbAuth: auth })
}

// export const withAuth = (
//   // TODO: reconsider this type safety around "any" below, I got lots of errors so far...
//   PageComponent: NextComponentType<NextPageContext, any, any>,
// ) => {
//   const withAuthCompo = ({ authUser, ...otherProps }: Props) => {
//     const fb = useFirebaseAuth()
//     const userContext = useLoginUser()
//     console.log(userContext, fb.state)

//     React.useEffect(() => {
//       if (fb.user) {
//         userContext.setUser(fb.user)
//       }
//     }, [fb.user])

//     if (fb.state === "notLoggedIn") {
//       return <NeedLogin login={fb.login} />
//     }
//     if (fb.state === "loggedIn" && userContext.user) {
//       return (
//         <Authenticated user={userContext.user}>
//           <PageComponent {...otherProps} />
//         </Authenticated>
//       )
//     }
//     return <InitializingApp />
//   }
//   withAuthCompo.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
//     const { req, res } = ctx
//     console.log("SSR in withAuth!!!!!")
//     if (typeof window === "undefined" && typeof req !== "undefined") {
//       addSession(req, res)
//       const actualReq = (req as unknown) as RequestWithSession
//       const authUser = actualReq.session?.user
//       console.log("SSR I W----", authUser)

//       return {
//         authUser: authUser ? authUser : null,
//       }
//     }
//     return {
//       authUser: null,
//     }
//   }
//   return withAuthCompo
// }
