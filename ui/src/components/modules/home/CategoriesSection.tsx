import React from "react";
import { NextPage } from "next";
import Link from 'next/link';

interface CategoriesSectionProps {
    categories?: any[]
}

export const CategoriesSection : NextPage<CategoriesSectionProps> = ({
    categories = []
}) => {
    return (
        <div className="bg-gray-100">
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl">
                <span className="block">Categories of digital goods</span>
              </h2>
              <p className="text-xl text-gray-700 text-center">Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet lectus sit pretium egestas vel mattis neque.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 pt-8">
                {categories.map((category) => (
                  <Link key={category.name} href={`/product?categories=${category.id}`}>
                    <a className="relative justify-center rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:ring-2 focus-within:ring-2 focus-within:ring-blue-500">
                       <span className="text-xl font-bold">{category.name}</span>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>        
    )
}

