import React from "react";
import { NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import ProductCreateSection from '../modules/product/ProductCreateSection';
import ProductCreateHeaderSection from '../modules/product/ProductCreateHeaderSection';
import { API_PRODUCT_SERVICE } from "../../utils/constants";
import { useSession } from 'next-auth/client';
import { Alert } from '../elements/Alert';

interface ProductCreatePageProps {
    categories: any[]
}

export const ProductCreatePage : NextPage<ProductCreatePageProps> = ({
    categories
}) => {
    const [session, loading] = useSession();
    const user = (session ? session.user : null);
    return (
        <DefaultLayout>
            { user ? (
                <>
                    <ProductCreateHeaderSection />
                    <ProductCreateSection categories={categories} />
                </>
            ) : (
                <Alert message="You need to log in to access this page." />
            ) }
        </DefaultLayout>
    )
}

ProductCreatePage.getInitialProps = async ({ req }) => {
    const fetchedCategories = await fetch(`https://${API_PRODUCT_SERVICE}/categories`)
        .then(response => response.json());
    return {
        categories: fetchedCategories
    }
}