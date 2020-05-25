// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
// https://github.com/expressjs/cookie-session#extending-the-session-expiration
console.warn("TODO: Improve type safeties")
export const cookieSessionRefreshMiddleware = (handler: any) => (
  req: any,
  res: any,
) => {
  if (req.session) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  }
  return handler(req, res)
}
