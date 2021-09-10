import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { SITE_NAME } from '../../utils/constants';

interface HeadCProps {
    title?: string;
    description?: string;
    keywords?: string[];
}

export const HeadC: NextPage<HeadCProps> = ({
    title,
    description = "Website description",
    keywords = []
}) => {
    return (
        <Head>
            { title ? <title>{title} | {SITE_NAME}</title> : <title>{SITE_NAME}</title>}
            <meta name="description" content={description} />
            <meta name="keywords" content={`${keywords?.map((keyword) => `, ${keyword}`)}`} />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}