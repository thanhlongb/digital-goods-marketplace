import React, { useContext, useEffect } from "react";
import Link from 'next/link'
import { NextPage } from "next";
import { ProductSectionContext } from "../../pages/ProductPage";

interface ProductSidebarProps {
    isOwner: boolean
}

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export const ProductSidebar : NextPage<ProductSidebarProps> = ({
    isOwner
}) => {
    const { currentSection, setCurrentSection } = useContext(ProductSectionContext);

    return (

    <aside className="order-first lg:order-last lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="bg-gray-50 p-4 rounded-md shadow space-y-2" aria-label="Sidebar">
            <button onClick={() => { setCurrentSection("details") }} 
                    className={classNames(
                      (currentSection == 'details') ? 'bg-indigo-400 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current="page">
              <span className="truncate">
                Product details 
              </span>
            </button>
            <button onClick={() => { setCurrentSection("reviews") }} 
                    className={classNames(
                      (currentSection == 'reviews') ? 'bg-indigo-400 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}>
              <span className="truncate">
                Reviews
              </span>
            </button>
            { isOwner ? (
              <button onClick={() => { setCurrentSection("purchases") }} 
                      className={classNames(
                        (currentSection == 'purchases') ? 'bg-indigo-400 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                        "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
                      )}>
                <span className="truncate">
                  Purchases
                </span>
              </button>            
            ) : null }
          {/* <a className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <span className="">
              Changelog
              <span className="ml-2 px-2 py-1 text-xs rounded-full text-white bg-red-400">
                Coming soon
              </span>
            </span>
          </a> */}
        </nav>
      </aside>

    )
}