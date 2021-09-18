import React, { createContext, useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { SearchSidebar } from "../modules/search/SearchSidebar";
import { SearchHeaderSection } from "../modules/search/SearchHeaderSection";
import { SearchResultsSection } from "../modules/search/SearchResultsSection";

export const sortByOptions = [
    {
      "id": "time",
      "name": "Recently updated"
    },
    {
      "id": "sales",
      "name": "Most sales"
    },
    {
      "id": "ratings",
      "name": "Best rating"
    }
]

export const SearchSectionContext = createContext(
    {   
        searchQuery: '',
        filterCategories: Array(),
        priceFrom: 0,
        priceTo: 100,
        orderBy: 'views',
        pageNumber: 1,
        pageLimit: 6,
        isSearching: false
    }
);

interface SearchPageProps {
    requestSearchQuery?: string,
    requestPriceFrom?: number,
    requestPriceTo?: number,
    requestOrderBy?: string, 
    requestFilterCategories?: string[],
    requestPageNumber?: number,
    requestPageLimit?: number,
}

const SearchPage : NextPage<SearchPageProps> = ({
    requestSearchQuery = '',
    requestPriceFrom = 0,
    requestPriceTo = 0,
    requestFilterCategories = Array(),
    requestPageNumber = 1,
    requestPageLimit = 6
}) => {
    const [searchQuery, setSearchQuery] = useState(requestSearchQuery);
    const [filterCategories, setFilterCategories] = useState(requestFilterCategories);
    const [priceFrom, setPriceFrom] = useState(requestPriceFrom);
    const [priceTo, setPriceTo] = useState(requestPriceTo);
    const [orderBy, setOrderBy] = useState(sortByOptions[0].id);
    const [pageNumber, setPageNumber] = useState(requestPageNumber);
    const [pageLimit, setPageLimit] = useState(requestPageLimit);
    const [isSearching, setIsSearching] = useState(true);
    const contextValues = {
        searchQuery, filterCategories,
        priceFrom, priceTo, orderBy, isSearching,
        pageNumber, pageLimit
    };
    const addFilterCategory = (category: string) => { 
        if (!filterCategories.includes(category)) {
            setFilterCategories([...filterCategories, category]);
        }
    }
    const removeFilterCategory = (category: string) => { 
        if (filterCategories.includes(category)) {
            setFilterCategories(filterCategories.filter((c) => c != category)); 
        }
    }
    const triggerSearch = () => {setIsSearching(true)}

    return (
        <DefaultLayout>
            <SearchSectionContext.Provider value={contextValues}>
                <SearchHeaderSection 
                    setSearchQuery={setSearchQuery}
                    setIsSearching={setIsSearching}
                    setPageNumber={setPageNumber} />
                <div className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <SearchSidebar 
                        triggerSearch={triggerSearch}  
                        setPriceFrom={setPriceFrom}
                        setPriceTo={setPriceTo} 
                        addFilterCategory={addFilterCategory}
                        removeFilterCategory={removeFilterCategory}
                        setPageNumber={setPageNumber} />
                    <SearchResultsSection
                        triggerSearch={triggerSearch} 
                        setIsSearching={setIsSearching}
                        setOrderBy={setOrderBy}
                        setPageNumber={setPageNumber}  />
                </div>
            </SearchSectionContext.Provider>
        </DefaultLayout>
    )
}

SearchPage.getInitialProps = ({ query }) => {
    const search = (typeof query.search === "string" && query.search.length > 0) ? query.search : '';
    const categories = (typeof query.categories === "string" && query.categories.length > 0) ? query.categories.split(',') : Array();
    const priceFrom = (typeof query.priceFrom === "string") ? (Number(query.priceFrom) ?? 0) : 0;
    const priceTo = (typeof query.priceTo === "string") ? (Number(query.priceTo) ?? 0) : 0;
    const pageNumber = (typeof query.page === "string") ? (Number(query.page) ?? 0) : 1;
    const pageLimit = (typeof query.limit === "string") ? (Number(query.limit) ?? 0) : 6;
    return {
        requestSearchQuery: search,
        requestFilterCategories: categories,
        requestPriceFrom: priceFrom,
        requestPriceTo: priceTo,
        requestPageNumber: pageNumber,
        requestPageLimit: pageLimit
    }
}


export default SearchPage