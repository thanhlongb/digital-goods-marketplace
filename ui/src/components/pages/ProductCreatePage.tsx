import React from "react";
import { NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import ProductCreateSection from '../modules/product/ProductCreateSection';
import ProductCreateHeaderSection from '../modules/product/ProductCreateHeaderSection';
import { API_PRODUCT_SERVICE } from "../../utils/constants";

interface ProductCreatePageProps {
    categories: any[]
}

export const ProductCreatePage : NextPage<ProductCreatePageProps> = ({
    categories
}) => {
    return (
        <DefaultLayout>
            <ProductCreateHeaderSection />
            <ProductCreateSection categories={categories} />
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