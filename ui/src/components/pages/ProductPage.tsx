import React, { createContext } from 'react';
import { NextPage } from 'next';
import { DefaultLayout } from '../layouts/DefaultLayout';
import ProductHeaderSection from '../modules/product/ProductHeaderSection';
import ProductDetailsSection from '../modules/product/ProductDetailsSection';
import ProductReviewsSection from '../modules/product/ProductReviewsSection';
import { ProductSidebar } from '../modules/product/ProductSidebar';
import { useState } from 'react';
import { API_PRODUCT_SERVICE, API_USER_SERVICE } from '../../utils/constants';
import ProductPurchaseConfirmSection from '../modules/product/ProductPurchaseConfirmSection';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

interface ProductPageProps {
    product?: any,
    avatar?: any,
    reviews?: any[],
    purchases?: any[]
}

export const ProductSectionContext = createContext(
    { 
        currentSection: 'details',
        setCurrentSection: (section: string) => {}
    }
);

const ProductPage : NextPage<ProductPageProps> = ({
    product,
    avatar,
    reviews,
    purchases
}) => {
    const [currentSection, setCurrentSection] = useState('details');
    const [session, loading] = useSession();
    const user = (session ? session.user : null);
    return (
        <DefaultLayout>
            { Object.keys(product).length > 0 ? (
                <>
                <ProductHeaderSection 
                    product={product}
                    seller={product.seller} 
                    avatar={avatar}
                    isOwner={product.seller == user?.name} />
                <ProductSectionContext.Provider value={{currentSection, setCurrentSection}}>
                    <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-12 lg:gap-x-5">
                        { (currentSection == 'details') && (
                            <ProductDetailsSection product={product} />
                        ) }
                        { (currentSection == 'reviews') && (
                            <ProductReviewsSection 
                            productId={product.id} 
                            reviews={reviews}
                            isOwner={product.seller == user?.name} />
                        ) }                    
                        { (currentSection == 'purchases') && (
                            <ProductPurchaseConfirmSection 
                                productId={product.id} 
                                purchases={purchases} />
                        ) }                    
                        <ProductSidebar isOwner={product.seller == user?.name} />
                    </div>
                </ProductSectionContext.Provider>
                </>
            ) : (
                <div className="max-w-max py-56 mx-auto">
                    <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Product not found</h1>
                        <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <Link href="/product">
                        <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Browse products
                        </a>
                        </Link>
                        <Link href="/">
                        <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Go back home
                        </a>
                        </Link>
                        </div>
                    </div>
                    </main>
                </div>
            ) }
        </DefaultLayout>
    )
}

ProductPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    const product = await fetch(`https://${API_PRODUCT_SERVICE}/products/${id}`)
        .then(response => response.json())
        .catch(error => null);
    const avatar = await fetch(`https://${API_USER_SERVICE}/v1/users/${product.seller}/avatar`)
        .then(response => response.json())
        .then(response => response.avatar)
        .catch(error => null);
    const reviews = await fetch(`https://${API_PRODUCT_SERVICE}/reviews?productid=${id}`)
        .then(response => response.json())
        .catch(error => null);
    const purchases = await fetch(`https://${API_PRODUCT_SERVICE}/purchases?product=${id}&filterConfirmed=true`)
        .then(response => response.json())
        .catch(error => null);

    return {
        product: product,
        avatar: avatar,
        reviews: reviews,
        purchases: purchases
    }
}

export default ProductPage