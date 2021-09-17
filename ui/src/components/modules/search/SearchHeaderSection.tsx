import React, { Dispatch, SetStateAction, useContext } from "react";
import { SearchSectionContext } from '../../pages/SearchPage';

interface SearchHeaderSectionProps {
  setSearchQuery: Dispatch<SetStateAction<string>>,
  setIsSearching: Dispatch<SetStateAction<boolean>>
}

export const SearchHeaderSection = ({
  setSearchQuery,
  setIsSearching
} : SearchHeaderSectionProps) => {
    const searchContext = useContext(SearchSectionContext);
    return (
        <div className="py-10 bg-gray-900 sm:py-16 lg:py-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-0 sm:max-w-2xl sm:text-center lg:text-left lg:flex lg:items-center">
                <div className="py-0">
                  <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
                    <span className="block">Find yourself something</span>
                  </h1>
                </div>
              </div>
              <div className="hidden lg:block mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img className="w-full object-cover object-top lg:inset-y-0 lg:left-0 lg:h-52 lg:w-full lg:max-w-none"
                       src="illustration.svg" 
                       alt="" />
                </div>
              </div>
            </div>
            
            <div className="mt-0">
              <form action="#" className="w-full sm:mx-auto lg:mx-0">
                <div className="sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="sr-only">Search</label>
                    <input id="search" 
                           type="search" 
                           placeholder="Search for an item"
                           className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                           value={searchContext.searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button 
                      type="submit"
                      disabled={ searchContext.isSearching }
                      onClick={() => setIsSearching(true)}
                      className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
                      Search</button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                  <a href="#" className="font-medium text-white"> totam rem aperiam</a>.</p>
              </form>
            </div>


          </div>
        </div>
        
    )
}