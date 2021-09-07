// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const dummyProduct = {
  name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
  price: 100,
  rating: 4.5,
  reviews: 126,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  details: 'Markdown text here',
  date: 'Mar 17, 2020',
  href: '',
  imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  seller: {
          name: 'Tom Cook',
          href: '#user',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
  category: 'Video'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(dummyProduct)
}
