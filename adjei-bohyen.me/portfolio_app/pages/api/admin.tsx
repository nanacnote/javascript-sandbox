// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { logVisitor } from '../../my_database'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.function === 'getVisitorCount') {
    const dbFeedback = await logVisitor({
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
    })
    res.statusCode = 200
    res.json({ total: dbFeedback + 100 })
  }
}

export default handler
