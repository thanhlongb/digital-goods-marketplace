import React, { useEffect, useState } from "react";
import { CalendarIcon, ChatAlt2Icon, ChevronRightIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import Image from 'next/image';
const { DateTime } = require("luxon");

type ProductHeaderSectionProps = {
    product: any,
    seller: any
}

const ProductHeaderSection = ({
  product,
  seller
} : ProductHeaderSectionProps) => {
  
// TODO: fetch category name

  return (

<div className="bg-gray-900">
  <div className="max-w-7xl mx-auto px-8 pb-8 lg:pb-16 flex-1 min-w-0">
    <nav className="flex overflow-hidden" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4" role="list">
        <li>
          <div>
            <Link href="/">
              <a className="text-sm font-medium text-gray-500 hover:text-gray-300">Home</a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Link href="/product">
              <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-300">Products</a> 
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Link href={`/product?categories=${product.category}`}>
              <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-300">Images</a>
            </Link>
          </div>
        </li>
      </ol>
    </nav>

    <div className="pt-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <div className="lg:col-span-7 relative">
        <img 
          className="h-full max-h-96 w-full object-cover rounded-md shadow-md"
          src={product.image_path}
          alt={product.name}
          // loader={() => "https://painel.posestacio.com.br/assets/eventos/img/imagem-not-found.jpg"}
          // width="100%"
          // height="400"
        />    
      </div>
      <div className="space-y-4 px-0 lg:col-span-5">
        <h2 className="mt-4 lg:mt-0 text-4xl tracking-7 font-extrabold text-white sm:text-3xl">
          {product.name}
        </h2>

        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            { DateTime.fromSeconds(product.published).toLocaleString(DateTime.DATE_MED) }
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <StarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            {product.rating} stars
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ChatAlt2Icon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            {product.reviews} reviews
          </div>
          
        </div>

        <div className="flex space-x-4">
          <div className="rounded-full bg-green-600">
            <div className="px-4 py-2 text-xl font-black text-green-100">
              ${product.price}
            </div>
          </div>
          <Link href={`/user/${seller.name}`}>
            <a className="group inline-block">
              <div className="flex p-1 rounded-full bg-gray-800 group-hover:bg-gray-700 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <div className="flex-shrink-0">
                  <img className="inline-block h-9 w-9 rounded-full" 
                      src={seller.imageUrl} 
                      alt={seller.name} />
                </div>
                <div className="ml-3 mr-4 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {seller.name}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div>
          <p className="text-white">
            {product.description}
          </p>
        </div>
        
        <div className="flex space-x-4">
          <span className="sm:block">
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <ShoppingBagIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Purchase
            </button>
          </span>
        </div>


      </div>
    </div>
  </div>
</div>

    )
}

export default ProductHeaderSection