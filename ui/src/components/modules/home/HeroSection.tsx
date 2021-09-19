import React, { useState } from "react";
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const HeroSection: NextPage<any> = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchButtonClick = (e: any) => {
      e.preventDefault()
      router.push({
        pathname: '/product',
        query: (searchQuery ? {'search': searchQuery} : null) 
        });
    }

    return (

        <div className="py-10 pt-2 bg-gray-900 sm:pt-6 sm:py-16 lg:py-6 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div
                className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1
                    className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">A marketplace for</span>
                    <span className="block text-indigo-400">digital goods</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Can’t find a powerpoint template for your next presentation? <br />
                  Need a sample website for your web assignment? <br /> You can find it right away from our website with high quality ensured! 
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="search" className="sr-only">Search</label>
                          <input 
                            id="search" 
                            name="search" 
                            type="text" 
                            placeholder="Search for an item"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900" />
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <button
                            onClick={(e) => handleSearchButtonClick(e)}
                            disabled={searchQuery.length == 0} 
                            type="submit"
                            className="block disabled:bg-indigo-400 w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
                            Search
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm italic text-gray-300 sm:mt-4">
                      Please note that our marketplace will only connect buyers and sellers. The payment process will be decided offsite. Please check out our 
                        <a href="#"
                          className="font-medium text-white"> Terms and Conditions</a>.</p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="illustration.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

    )
}