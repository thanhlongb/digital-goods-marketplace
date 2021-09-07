import React from "react";
import { NextPage } from "next";
import Link from 'next/link';

export const CallToActionSection : NextPage<any> = () => {
    return (

        <div className="bg-gray-100 w-full">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Found something you like?</span>
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Hurry up! Sign up now to purchase it.</span>
            </h2>
            <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
              <Link href="/product">
                <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-800 bg-white hover:bg-gray-50">
                  Show me more
                </a>
              </Link>
              <a href="#" className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700">
                Sign me up!
              </a>
            </div>
          </div>
        </div>        

    )
}