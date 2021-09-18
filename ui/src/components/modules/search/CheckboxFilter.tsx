import React, { useContext } from "react";
import { NextPage } from "next";
import { ChevronDownIcon } from '@heroicons/react/outline'
import { SearchSectionContext } from "../../pages/SearchPage";

interface CheckboxFilterProps {
  options: any[],
  addFilterCategory: any,
  removeFilterCategory: any,
  triggerSearch: any,
  setPageNumber: any
}

export const CheckboxFilter : NextPage<CheckboxFilterProps> = ({
  options,
  addFilterCategory,
  removeFilterCategory,
  triggerSearch,
  setPageNumber
}) => {
    const { filterCategories } = useContext(SearchSectionContext);
    return (
      <dl className="space-y-6 pb-8 divide-y divide-gray-200">
        <div className="pt-0">
          <dt className="text-lg">
            <button type="button" className="text-left w-full flex justify-between items-start text-gray-400"
              aria-controls="faq-0" aria-expanded="false">
              <span className="font-medium text-lg text-gray-900">
                Categories
              </span>
              <span className="ml-6 h-7 flex items-center">
                <ChevronDownIcon className="rotate-0 h-6 w-6 transform" aria-hidden="true" />
              </span>
            </button>
          </dt>
          <dd className="mt-0" id="faq-0">
            <fieldset className="space-y-4">
              <legend className="sr-only">Categories</legend>

            { (options && options.length > 0) ? (
                options.map((option) => (
                <div key={option.id} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input key={option.id}
                          id={`category-${option.id}`} 
                          name={`category-${option.id}`} 
                          type="checkbox"
                          defaultChecked={filterCategories.includes(option.id.toString())}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" 
                          onChange={(e) => {
                            (e.target.checked) ? addFilterCategory(option.id) : removeFilterCategory(option.id);
                            triggerSearch();
                            setPageNumber(1);
                          }}
                      />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`category-${option.id}`} className="font-medium text-gray-700">{option.name}</label>
                  </div>
                </div>
                )) 
              ) : (
                <p>No category found.</p>
              ) } 
            </fieldset>
          </dd>
        </div>

      </dl>

    )
}