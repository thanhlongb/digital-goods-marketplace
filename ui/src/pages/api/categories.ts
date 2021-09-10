// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const dummyCategories = [
    { name: 'Videos', href: '#' },
    { name: 'Audios', href: '#' },
    { name: 'Images', href: '#' }
  ]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(dummyCategories)
}
