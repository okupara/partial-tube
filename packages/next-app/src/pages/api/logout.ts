import { NextApiResponse } from "next"
import { addSessionMiddleWare } from "../../middlewares/addSession"

const handler = (req: SessionNextApiRequest, res: NextApiResponse) => {
  req.session = null
  res.send({ result: true })
}

export default addSessionMiddleWare(handler)
