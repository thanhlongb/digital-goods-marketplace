import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { API_BASE_URL } from "../../../utils/constants";
const { DateTime } = require("luxon");

type ProductCardProps = {
  id: number,  
  name?: string,
  price?: number,
  date?: number,
  imageUrl?: string,
  sellerId?: string,
  categoryId?: string,
}

export const ProductCard = ({ 
  id,  
  name,
  price,
  date,
  imageUrl,
  sellerId, 
  categoryId,
} : ProductCardProps) => {
  const [seller, setSeller] = useState({'name': 'undefined', 'imageUrl': '#'});
  const [category, setCategory] = useState({'name': 'undefined'});
  const fetchSeller = async (id: string) => {
    fetch(`http://${API_BASE_URL}/getUser`)
      .then(response => response.json())
      .then(fetchedSeller => setSeller(fetchedSeller));
  }
  const fetchCategory = async (id: string) => {
    fetch(`http://${API_BASE_URL}/categories/${id}`)
      .then(response => response.json())
      .then(fetchedCategory => setCategory(fetchedCategory));
  }  
  useEffect(() => {
    if (sellerId) fetchSeller(sellerId);
    if (categoryId) fetchCategory(categoryId);
  }, [])
    return (
        <div className="group flex flex-col focus-within:ring-4 focus-within:ring-blue-500 rounded-lg shadow overflow-hidden">
          <Link href={`/product/${id}`}>
          <a>
          <div className="flex-shrink-0 relative">
            <img className="h-56 w-full object-cover" src={imageUrl} alt="" />
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:to-gray-800"></div>
            <div className="flex-1 absolute bottom-0 left-0 right-0 pb-4 px-4">
              <p className="text-sm font-medium text-white bg-blue-500 inline-block px-3 py-1 rounded-full">
                {/* TODO: category path */}
                <Link href={`/product?categories=${categoryId}`}>
                  <a className="hover:underline">
                    {category.name}
                  </a>
                </Link>
              </p>
              <p className="text-xl font-semibold text-white">
                {name}
              </p>
            </div>
      
          </div>
          <div className="flex-1 bg-gray-900 group-hover:bg-gray-800 p-4 flex flex-col justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href={`/user/${seller.name}`}>
                <a>
                  <img className="h-10 w-10 rounded-full" 
                       src={seller.imageUrl} 
                       alt={seller.name} />
                </a>
                </Link>
              </div>
              <div className="flex-1 ml-3">
                <p className="text-sm font-medium text-white">
                  <Link href={`/user/${seller.name}`}>
                  <a className="hover:underline">
                    {seller.name}
                  </a>
                  </Link>
                </p>
                <div className="flex space-x-1 text-sm text-gray-300">
                  {/* TODO: change dateTime value */}
                  <time dateTime="2020-03-16"> 
                    { DateTime.fromSeconds(date).toLocaleString(DateTime.DATE_MED) }
                  </time>
                </div>
              </div>
              <div className="flex-shrink-0">
                
                <span className="text-white tracking-wide text-3xl font-black">
                  ${price}
                </span>
              </div>
            </div>
          </div>
          </a>
          </Link>
        </div>
    )
}
