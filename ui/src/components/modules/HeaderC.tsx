import React from "react";
import { NextPage } from "next";
import { NavigationBar } from "./NavigationBar";

export const HeaderC: NextPage<any> = () => {
    return (
        <header>
            <NavigationBar />
        </header>
    )
}