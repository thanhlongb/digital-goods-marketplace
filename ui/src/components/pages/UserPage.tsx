import React from "react";
import { NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { UserHeaderSection } from '../modules/user/UserHeaderSection';
import { ProductsListSection } from "../modules/home/ProductsListSection";
import { API_BASE_URL } from "../../utils/constants";
import { Alert } from "../elements/Alert";

interface UserPageProps {
    user?: any,
    sellingProducts?: any,
    boughtProducts?: any
}

const UserPage : NextPage<UserPageProps> = ({
    user,
    sellingProducts,
    boughtProducts
}) => {
    return (
        <DefaultLayout>
            { user ? (
                <>
                    <UserHeaderSection 
                        avatar={user.imageUrl}
                        username={user.name}
                        email={user.email} />
                    <ProductsListSection 
                        title="Selling products"
                        products={sellingProducts}
                        noProductMessage="This user is not offering any product." />
                    <hr />
                    <ProductsListSection 
                        title="Bought products"
                        products={boughtProducts}
                        noProductMessage="You haven't purchased any product." />
                </>
            ) : (
                <div className="mx-auto max-w-7xl p-8">
                    <Alert message="This user doesn't exists." />
                </div>
            ) }

        </DefaultLayout>
    )
}

UserPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    const user            = await (await fetch(`http://${API_BASE_URL}/getUser`)).json();
    const sellingProducts = user ? (await (await fetch(`http://${API_BASE_URL}/getSellingProducts`)).json()) : [];
    const boughtProducts  = user ? (await (await fetch(`http://${API_BASE_URL}/getBoughtProducts`)).json()) : [];
    
    return {
      sellingProducts: sellingProducts,
      boughtProducts: boughtProducts,
      user: user,
    }
}

export default UserPage