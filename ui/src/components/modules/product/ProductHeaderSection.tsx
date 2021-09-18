import React, { useEffect, useState } from "react";
import { CalendarIcon, ChatAlt2Icon, ChevronRightIcon, ShoppingBagIcon, StarIcon, CloudDownloadIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import { API_PRODUCT_SERVICE } from "../../../utils/constants";
import { useSession } from 'next-auth/client';
import axios from "axios";
const { DateTime } = require("luxon");

type ProductHeaderSectionProps = {
    product: any,
    seller: any,
    avatar: any,
    isOwner: boolean 
}

const ProductHeaderSection = ({
  product,
  seller,
  avatar,
  isOwner
} : ProductHeaderSectionProps) => {
  const [session, loading] = useSession();
  const user = (session ? session.user : null);
  const [category, setCategory] = useState<null | string>(null);
  const [purchase, setPurchase] = useState<null | any>(null);
  const fetchPurchase = async () => {
    fetch(`https://${API_PRODUCT_SERVICE}/purchases?product=${product.id}&buyer=${user?.name}`)
      .then(response => response.json())
      .then((purchase:any) => {
        if (Object.keys(purchase).length > 0) {
          setPurchase(purchase);
        }
      })
      .catch(error => console.log(error));
  }
  const fetchCategory = async (id: string) => {
    fetch(`https://${API_PRODUCT_SERVICE}/categories/${id}`)
      .then(response => response.json())
      .then(fetchedCategory => setCategory(fetchedCategory.name))
      .catch(error => console.log(error));
  }    
  const handlePurchase = () => {
    axios.post(`https://${API_PRODUCT_SERVICE}/purchases`, {
      productId: product.id,
      buyer: user?.name      
    }).then(response => {
      setPurchase(response.data)
    })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (user && purchase === null) fetchPurchase();
  }, [user])
  useEffect(() => {
    fetchCategory(product.category);
  }, [])
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
        { category && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <Link href={`/product?categories=${product.category}`}>
                <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-300">{category}</a>
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>

    <div className="pt-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <div className="lg:col-span-7 relative">
        <img 
          className="h-full max-h-96 w-full object-cover rounded-md shadow-md"
          src={product.image_path && product.image_path.length > 0 ? product.image_path : "https://painel.posestacio.com.br/assets/eventos/img/imagem-not-found.jpg"}
          alt={product.name}
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
            {Number(product.rating_avg).toFixed(1)} stars
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ChatAlt2Icon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            {product.review_count} reviews
          </div>
          
        </div>

        <div className="flex space-x-4">
          <div className="rounded-full bg-green-600">
            <div className="px-4 py-2 text-xl font-black text-green-100">
              ${product.price}
            </div>
          </div>

            <Link href={`/user/${seller}`}>
              <a className="group inline-block">
                <div className="flex p-1 rounded-full bg-gray-800 group-hover:bg-gray-700 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <div className="flex-shrink-0">
                    <img className="inline-block h-9 w-9 rounded-full" 
                        src={avatar} 
                        alt={seller} />
                  </div>
                  <div className="ml-3 mr-4 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">
                      {seller}
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
        { !isOwner ? (
        <div className="flex space-x-4">
        <span className="sm:block">
          { purchase ? (
             purchase.confirmed ? (
              <Link href={product.file_path}>
                <a target="_blank"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <CloudDownloadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Download
                </a>
              </Link>              
             ) : (
                <div className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Waiting confirmation
                </div>
             ) 
          ) : (
            user !== null && 
            <button type="button"
                    onClick={() => handlePurchase()} 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <ShoppingBagIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Purchase
            </button>              
          ) }
        </span>
      </div>          
        ) : null }
      </div>
    </div>
  </div>
</div>

    )
}

export default ProductHeaderSection