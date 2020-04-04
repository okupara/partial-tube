import getConfig from "next/config"
import cookieSession from "cookie-session"

export const addSession = (req: any, res: any) => {
  // @TODO: improve type safety
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

export default (handler: any) => (req: any, res: any) => {
  try {
    addSession(req, res)
  } catch (e) {
    return res.status(500).json({ error: "Could not get user session." })
  }
  return handler(req, res)
}
