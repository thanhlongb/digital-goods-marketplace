import React from "react";
import { NextPage } from "next";
import { SellerCard } from "./SellerCard";
import { Alert } from '../../elements/Alert';

interface TopSellersSectionProps {
    sellers: any[]
}

export const TopSellersSection : NextPage<TopSellersSectionProps> = ({
    sellers = []
}) => {
    return (

        <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Top sellers of this month</h2>
                        <p className="text-xl text-gray-500">Shout out to this month most active contributors. Check out their products now 👋.</p>
                    </div>
                    <div className="lg:col-span-2">
                        
                        { (sellers.length > 0) ? (
                            <ul className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:gap-x-8">

                            {sellers.map((seller) => (
                                <SellerCard 
                                    key={seller.seller} 
                                    name={seller.seller}
                                    sales={seller.sales} />
                            ))}  
                            
                            </ul>
                        ) : (
                            <Alert message="No seller found." />
                        ) }      
                        </div>                        
                </div>
            </div>
        </div>
        
    )
}