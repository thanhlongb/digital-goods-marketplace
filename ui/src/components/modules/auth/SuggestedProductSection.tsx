import React from "react";
import { NextPage } from "next";

const dummyProduct = {
    name: "Sed dui aliquet lectus sit pretium egestas vel mattis neque",
    href: '',
    imageUrl: 'https://images.unsplash.com/photo-1613182454978-e59ca9ab3adf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    seller: {
            name: 'Tom Cook',
        }
}

interface SuggestedProductSectionProps {
    product?: any
}

export const SuggestedProductSection: NextPage<SuggestedProductSectionProps> = ({
    product = dummyProduct
}) => {
    return (

        <div className="hidden lg:block relative w-0 flex-1">
          <img className="absolute inset-0 h-full w-full object-cover rounded-tr-md rounded-br-md" 
                src={product.imageUrl} 
                alt={product.name} />
          <a href="#" className="absolute font-medium text-lg text-black right-0 bottom-0 m-4 px-4 py-2 rounded-full bg-opacity-70 bg-white hover:bg-opacity-100">
            Product by <span className="text-indigo-500">@{product.seller.name}</span>
          </a>
        </div>

    )
}