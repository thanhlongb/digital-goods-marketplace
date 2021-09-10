import React from "react";
import { NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import ProductCreateSection from '../modules/product/ProductCreateSection';
import ProductCreateHeaderSection from '../modules/product/ProductCreateHeaderSection';

interface ProductCreatePageProps {
    
}

export const ProductCreatePage : NextPage<ProductCreatePageProps> = ({

}) => {
    return (
        <DefaultLayout>
            <ProductCreateHeaderSection />
            <ProductCreateSection />
        </DefaultLayout>
    )
}