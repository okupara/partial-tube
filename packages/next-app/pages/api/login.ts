import { NextApiRequest, NextApiResponse } from "next"
import { verifyIdToken } from "../../utils/verifyIdToken"
import { addSessionMiddleWare } from "../../middlewares/addSession"
import { cookieSessionRefreshMiddleware } from "../../middlewares/cookieSessionRefresh"
import * as User from "@partial-tube/core/lib/models/User"

type SessionNextApiRequest = NextApiRequest & {
  session: { user: User.Model; token: string }
}

type ActualDecodedUser = {
  user_id: string
  name: string
  picture: string
}

const handler = (req: SessionNextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400)
  }
  const { token } = req.body

  return verifyIdToken(token)
    .then((verifiedUser) => {
      // because the fields from type-definition is different from the fields veriyIdToken returns.
      const actual = (verifiedUser as unknown) as ActualDecodedUser
      req.session.user = {
        id: actual.user_id,
        avatarUrl: actual.picture,
        name: actual.name,
      }
      req.session.token = token
      res.send({ result: true })
    })
    .catch((e) => {
      console.error(e)
      res.send({ result: false })
    })
}

export default addSessionMiddleWare(cookieSessionRefreshMiddleware(handler))
