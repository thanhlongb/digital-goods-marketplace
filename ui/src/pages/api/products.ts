// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const dummyProducts = [
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
    {
        name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
        price: 100,
        date: 'Mar 17, 2020',
        href: '',
        imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        seller: {
                name: 'Tom Cook',
                href: '#user',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        category: 'Video'
    },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(dummyProducts)
}
