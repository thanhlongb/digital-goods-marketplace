import React from "react";
import { NextPage } from "next";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthCard } from "../modules/auth/AuthCard";
import { SignInSection } from '../modules/auth/SignInSection';
import { SuggestedProductSection } from "../modules/auth/SuggestedProductSection";

export const SignInPage : NextPage = () => {
    return (
        <AuthLayout>
            <AuthCard>
                <SignInSection />
                <SuggestedProductSection />
            </AuthCard>
        </AuthLayout>
    )
}