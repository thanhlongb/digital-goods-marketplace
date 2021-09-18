import React, { useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { NextPage } from "next";
import { ProductCard } from "../product/ProductCard";
import { Pagination } from "./Pagination";
import { Alert } from '../../../components/elements/Alert';
import { SearchSectionContext, sortByOptions } from '../../pages/SearchPage';
import { API_BASE_URL, API_PRODUCT_SERVICE } from "../../../utils/constants";

type SearchResultsSectionProps = {
  setIsSearching: Dispatch<SetStateAction<boolean>>,
  setOrderBy: Dispatch<SetStateAction<string>>,
  setPageNumber: Dispatch<SetStateAction<number>>,
  triggerSearch: any
}

export const SearchResultsSection = ({
  setIsSearching,
  setOrderBy,
  setPageNumber,
  triggerSearch
} : SearchResultsSectionProps) => {
  const searchContext = useContext(SearchSectionContext);
  const [products, setProducts] = useState(Array());
  const [productsCount, setProductsCount] = useState(0);

  const fetchProducts = async () => {
    const queryParams = new URLSearchParams();
    if (searchContext.searchQuery) 
      queryParams.append("query", searchContext.searchQuery);
    if (searchContext.priceFrom > 0)
      queryParams.append("priceFrom", searchContext.priceFrom.toString());
    if (searchContext.priceTo > 0)
      queryParams.append("priceTo", searchContext.priceTo.toString());
    if (searchContext.filterCategories.length > 0)
      queryParams.append("filterCategories", searchContext.filterCategories.join(','))
    if (searchContext.orderBy)
      queryParams.append("orderBy", searchContext.orderBy)
    if (searchContext.pageNumber)
      queryParams.append("pageNumber", searchContext.pageNumber.toString())

    fetch(`https://${API_PRODUCT_SERVICE}/products/search?${queryParams.toString()}`)
      .then(response => response.json())
      .then(response => {
        setProducts(response.products); 
        setProductsCount(response.totalResults)
      });
  }
  
  useEffect(() => {
    if (searchContext.isSearching == true) {
      fetchProducts();
      setIsSearching(false);
    }
  }, [searchContext.isSearching])

    return (
      <div className="space-y-6 px-4 sm:px-6 lg:px-0 lg:col-span-10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="flex items-center text-base font-medium text-gray-400">
            Found {productsCount} results
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center text-sm text-gray-500">
            <label htmlFor="sort" className="inline-block pr-2 text-base w-auto font-medium text-gray-400">
              Sort by:
            </label>
            <select id="sort" 
                    name="sort"
                    onChange={e => {setOrderBy(e.target.value); setPageNumber(1); triggerSearch()}}
                    value={searchContext.orderBy}
                    className="block text-gray-800 font-bold w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              { sortByOptions.map((option) => 
                <option key={option.id}
                        value={option.id}>
                  {option.name}
                </option>
              ) }
            </select>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl">
        { (products && products.length > 0) ? (
            searchContext.isSearching ? (
              <p>Searching...</p>
            ) : (
              products.map((product: any) => (
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
              )) 
            )  
          ) : (
            <Alert message="No product found." />
          ) }
        </div>
        <Pagination 
          setPageNumber={setPageNumber} 
          triggerSearch={triggerSearch}
          pageMaxValue={Math.ceil(productsCount/searchContext.pageLimit)} />
      </div>
    )
}