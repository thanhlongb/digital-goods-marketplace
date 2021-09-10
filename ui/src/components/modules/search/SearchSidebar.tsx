import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { API_BASE_URL } from "../../../utils/constants";

interface SearchSidebarProps {
    triggerSearch: any,
    setPriceFrom: any,
    setPriceTo: any,
    addFilterCategory: any,
    removeFilterCategory: any
}

export const SearchSidebar = ({
    triggerSearch,
    setPriceFrom,
    setPriceTo,
    addFilterCategory,
    removeFilterCategory
} : SearchSidebarProps) => {
    const [categories, setCategories] = useState(Array());    
    const fetchCategories = async () => {
        fetch(`http://${API_BASE_URL}/categories`)
            .then(response => response.json())
            .then(fetchedCategories => setCategories(fetchedCategories));
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (

        <aside className="py-6 px-4 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
            <CheckboxFilter 
                options={categories}
                addFilterCategory={addFilterCategory}
                removeFilterCategory={removeFilterCategory} 
                triggerSearch={triggerSearch}
            />
            {/* <CheckboxFilter /> */}
            <PriceRangeFilter 
                triggerSearch={triggerSearch} 
                setPriceFrom={setPriceFrom}
                setPriceTo={setPriceTo}
            />
        </aside>
        
    )
}
