import React, { useContext } from "react";
import { NextPage } from "next";
import { ArrowNarrowRightIcon, ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import { SearchSectionContext } from "../../pages/SearchPage";

interface PaginationProps {
  triggerSearch: any,
  setPageNumber: any,
  pageMaxValue: number
}

export const Pagination : NextPage<PaginationProps> = ({
  triggerSearch,
  setPageNumber,
  pageMaxValue
}) => { 
  const searchContext = useContext(SearchSectionContext);
  const pageOffset = 2;
    const goToPage = (page: number) => {
      setPageNumber(page);
      triggerSearch();
    }
    return (
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
          <div className="-mt-px w-0 flex-1 flex">            
            { (searchContext.pageNumber > 1) ? (
            <button
              onClick={() => {
                setPageNumber(searchContext.pageNumber - 1);
                triggerSearch();
              }}
              className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </button>
            ) : null }
          </div>
          <div className="hidden md:-mt-px md:flex">
            {/* TODO: Might need to explain this pagination code,
            Buttttt... Consider it's black magic for now */}
          { (searchContext.pageNumber > pageOffset + 2) ? (
            <>
              <button
                onClick={() => goToPage(1)}
                className="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                1
              </button>            
              <span
                className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                ...
              </span>      
            </>      
          ) : null }
          {[...Array(2*pageOffset + 1)].map((x, i) => 
            (searchContext.pageNumber + (i-pageOffset) > 0 && searchContext.pageNumber + (i-pageOffset) <= pageMaxValue) ? (
              <button
                onClick={() => {
                  goToPage(searchContext.pageNumber + (i-pageOffset))
                }}
                disabled={i == pageOffset}
                className={`${i == pageOffset ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 "} 
                            border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
                >
                {searchContext.pageNumber + (i-pageOffset)}
              </button>
            ) : null
          )}
          { (searchContext.pageNumber < pageMaxValue - 2) ? (
            <>
              <span
                className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                ...
              </span>              
              <button
                onClick={() => goToPage(pageMaxValue)}
                className="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                {pageMaxValue}
              </button>                
            </>      
          ) : null }          
          </div>
          <div className="-mt-px w-0 flex-1 flex justify-end">
            { (searchContext.pageNumber < pageMaxValue) ? (
            <button
              onClick={() => {
                setPageNumber(searchContext.pageNumber + 1);
                triggerSearch();
              }}            
              className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Next
              <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
            ) : null }            
          </div>
        </nav>

    )
}