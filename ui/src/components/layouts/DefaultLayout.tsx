import React from "react";
import { NextPage } from "next";
import { HeadC } from "../modules/HeadC";
import { HeaderC } from '../modules/HeaderC';
import { FooterC } from '../modules/FooterC';

export const DefaultLayout: NextPage<any> = ({
    children
}) => {
    return (
        <>
            <HeadC />
            <HeaderC />
            <main className="bg-gray-100">
                {children}
            </main>
            <FooterC />        
        </>
    )
}