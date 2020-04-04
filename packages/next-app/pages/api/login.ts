import { NextApiRequest, NextApiResponse } from "next"
// import { verifyIdToken } from "../../utils/verifyIdToken"

const Login = (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400)
  }
  res.status(200).send({ result: true })
  // const { token } = req.body

  // verifyIdToken(token)
  //   .then(() => res.send({ result: true }))
  //   .catch((e) => {
  //     console.error(e)
  //     res.send({ result: false })
  //   })
}

export default Login
