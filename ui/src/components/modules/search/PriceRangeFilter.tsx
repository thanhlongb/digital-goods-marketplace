import React from "react";
import { NextPage } from "next";
import { ChevronDownIcon } from '@heroicons/react/outline'

interface PriceRangeFilterProps {
  triggerSearch: () => {}
  setPriceFrom: (price: any) => {}
  setPriceTo: (price: any) => {}
}

export const PriceRangeFilter : NextPage<PriceRangeFilterProps> = ({
  triggerSearch,
  setPriceFrom,
  setPriceTo,
}) => {
    return (

      <dl className="space-y-6 pb-8 divide-y divide-gray-200">
        <div className="pt-0">
          <dt className="text-lg">
            <button type="button" className="text-left w-full flex justify-between items-start text-gray-400"
              aria-controls="faq-0" aria-expanded="false">
              <span className="font-medium text-lg text-gray-900">
                Price range
              </span>
              <span className="ml-6 h-7 flex items-center">
                <ChevronDownIcon className="rotate-0 h-6 w-6 transform" aria-hidden="true" />
              </span>
            </button>
          </dt>
          <dd className="mt-2" id="faq-0">
            <div className="flex rounded-md shadow-sm mb-4">
              <span
                className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                From
              </span>
              <input type="number" 
                     name="from" 
                     id="from" 
                     autoComplete="from"
                     className="flex-1 text-right px-2 block border w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                     onChange={(e) => setPriceFrom(e.target.value)}
                     />
            </div>
            <div className="flex rounded-md shadow-sm mb-4">
              <span
                className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                To
              </span>
              <input type="number" 
                     name="to" 
                     id="to" 
                     autoComplete="to"
                     className="flex-1 text-right px-2 block border w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                     onChange={(e) => setPriceTo(e.target.value)}
                     />
            </div>
            <div className="flex rounded-md shadow-sm">
              <button 
                type="submit"
                className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                onClick={() => { triggerSearch()}}>
                Set range</button>
            </div>

          </dd>
        </div>
      </dl>

    )
}