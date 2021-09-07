import React, { createContext, useEffect } from 'react';
import { NextPage } from 'next';
import { DefaultLayout } from '../layouts/DefaultLayout';
import ProductHeaderSection from '../modules/product/ProductHeaderSection';
import ProductDetailsSection from '../modules/product/ProductDetailsSection';
import ProductReviewsSection from '../modules/product/ProductReviewsSection';
import { ProductSidebar } from '../modules/product/ProductSidebar';
import { useState } from 'react';
import { API_BASE_URL } from '../../utils/constants';

interface ProductPageProps {
    product?: any,
    seller?: any,
    reviews?: any[]
}

export const ProductSectionContext = createContext(
    { 
        currentSection: 'details',
        setCurrentSection: (section: string) => {}
    }
);

const ProductPage : NextPage<ProductPageProps> = ({
    product,
    seller,
    reviews
}) => {
    const [currentSection, setCurrentSection] = useState('details');

    return (
        <DefaultLayout>
            <ProductHeaderSection 
                product={product}
                seller={seller} />
            <ProductSectionContext.Provider value={{currentSection, setCurrentSection}}>
                <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-12 lg:gap-x-5">
                    { (currentSection == 'details') && (
                        <ProductDetailsSection product={product} />
                    ) }
                    { (currentSection == 'reviews') && (
                        <ProductReviewsSection reviews={reviews} />
                    ) }                    
                    <ProductSidebar />
                </div>
            </ProductSectionContext.Provider>
        </DefaultLayout>
    )
}

ProductPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    // TODO: Probably retarded
    const product = await fetch(`http://${API_BASE_URL}/getProduct`).then(response => response.json());
    const seller = await fetch(`http://${API_BASE_URL}/getUser`).then(response => response.json());
    const reviews = await fetch(`http://${API_BASE_URL}/reviews?product=${id}`).then(response => response.json());

    return {
        product: product,
        seller: seller,
        reviews: reviews
    }
}

export default ProductPage