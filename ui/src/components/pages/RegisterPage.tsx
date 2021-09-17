import React from "react";
import { NextPage } from "next";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthCard } from "../modules/auth/AuthCard";
import { SuggestedProductSection } from "../modules/auth/SuggestedProductSection";
import { RegisterSection } from '../modules/auth/RegisterSection';

export const RegisterPage : NextPage = () => {
    return (
        <AuthLayout>
            <AuthCard>
                <RegisterSection />
                <SuggestedProductSection />
            </AuthCard>
        </AuthLayout>
    )
}