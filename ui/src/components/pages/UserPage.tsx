import React from "react";
import { NextPage } from "next";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { UserHeaderSection } from '../modules/user/UserHeaderSection';
import { ProductsListSection } from "../modules/home/ProductsListSection";
import { API_PRODUCT_SERVICE, API_USER_SERVICE } from "../../utils/constants";
import { Alert } from "../elements/Alert";
import { useSession } from 'next-auth/client';

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
    const [session, loading] = useSession();
    const currentUser = (session ? session.user : null);    
    return (
        <DefaultLayout>
            { user ? (
                <>
                    <UserHeaderSection 
                        avatar={user.avatar}
                        username={user.name}
                        email={user.email}
                        isCurrentUser={user.name == currentUser?.name} />
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
    // TODO the awaits below is autistic, fix it
    const user            = await fetch(`https://${API_USER_SERVICE}/v1/users/${id}`)
        .then(response => response.json())
        .catch(error => null);
    const sellingProducts = user ? (
        await fetch(`https://${API_PRODUCT_SERVICE}/products/selling?user=${id}`)
            .then(response => response.json())
        ) : [];
    // const boughtProducts  = user ? (await (await fetch(`https://${API_PRODUCT_SERVICE}/purchases?buyer=${id}`)).json()) : [];
    
    return {
      sellingProducts: sellingProducts,
      boughtProducts: [],
      user: user,
    }
}

export default UserPage