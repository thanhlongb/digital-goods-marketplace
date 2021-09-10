import React from "react";
import { NextPage } from "next";

export const AuthCard: NextPage<any> = ({
    children
}) => {
    return (
        <div className="w-full h-screen sm:flex sm:w-3/4 sm:h-auto bg-white rounded-md">
            {children}
        </div>
    )
}