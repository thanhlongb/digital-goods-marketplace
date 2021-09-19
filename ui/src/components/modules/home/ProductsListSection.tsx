import React from "react";
import Link from "next/link";
import { ProductCard } from "../product/ProductCard";
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { Alert } from '../../elements/Alert';

type ProductsListSectionProps = {
  products: any[],
  title?: string,
  subtitle?: string,
  showViewMore?: boolean,
  noProductMessage?: string,
}

export const ProductsListSection = ({
  products,
  title = "Ornare sagittis",
  subtitle,
  showViewMore = false,
  noProductMessage
} : ProductsListSectionProps) => {
    return (
    
      <div className="bg-white">
        <div className="space-y-12 mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-16">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="text-xl text-gray-700">
            { (subtitle) ?? "Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet lectus sit pretium egestas vel mattis neque." }
            </p>
          </div>
    
          { (products.length > 0) ? (
            <div className="mt-12 mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id} 
                  name={product.name} 
                  price={product.price} 
                  date={product.published} 
                  imageUrl={product.image_path} 
                  sellerId={product.seller} 
                  categoryId={product.category} 
                  />
              ))}  
            </div>  
          ) : (
            <Alert message={noProductMessage ?? "No product found." } />
          ) }
            
          { showViewMore ? (
            <div className="mt-5 text-right">
              <Link href="/product">
                <a className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700">
                  View more products
                  <ArrowSmRightIcon className="inline-block h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            </div>
          ) : null }
          
        </div>
      </div>        
        
    )
}