import getConfig from "next/config"
import cookieSession from "cookie-session"
import { NextApiRequest, NextApiResponse } from "next"

// NextApi* types don't match as arguments for cookie-session...
console.warn('[TODO] Stop using "any"')
export const addSession = (req: any, res: any) => {
  const { serverRuntimeConfig } = getConfig()
  const sessionSecrets = [
    serverRuntimeConfig.sessionKey1,
    serverRuntimeConfig.sessionKey2,
  ]
  const includeSession = cookieSession({
    keys: sessionSecrets,
    maxAge: 604800000,
    httpOnly: true,
    overwrite: true,
  })

  includeSession(req, res, () => {})
}

export const addSessionMiddleWare = (handler: any) => (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    addSession(req, res)
  } catch (e) {
    return res.status(500).json({ error: "Could not get user session." })
  }
  return handler(req, res)
}
