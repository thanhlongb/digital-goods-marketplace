import React from "react";
import { NextPage } from "next";
import { HeadC } from "../modules/HeadC";

export const AuthLayout: NextPage<any> = ({
    children
}) => {
    return (
        <>
            <HeadC />
            <main className="min-h-screen bg-indigo-900 flex justify-center items-center">
                {children}
            </main>
        </>
    )
}