import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { API_PRODUCT_SERVICE } from "../../../utils/constants";

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}  

type ProductPurchaseCardProps = {
    purchase: any
}

export const ProductPurchaseCard = ({
    purchase
} : ProductPurchaseCardProps) => {
    const [session, loading] = useSession();
    const user = (session ? session.user : null);
    const [confirmed, setConfirmed] = useState(false);
    const handleConfirm = () => {
      axios.patch(`https://${API_PRODUCT_SERVICE}/purchases?product=${purchase.productId}&buyer=${purchase.buyer}`)
        .then(response => {
            setConfirmed(response.data.success)
        })
        .catch(error => console.log(error));
    }
    return (

        <li key={purchase.id} className="py-4 px-2">
        <div className="flex items-center space-x-4">
            {/* <div className="flex-shrink-0"> */}
            {/* <img className="h-8 w-8 rounded-full" src={purchase.buyer} alt="" /> */}
            {/* </div> */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{purchase.buyer}</p>
                <p className="text-sm text-gray-500 truncate">{'@' + purchase.buyer}</p>
            </div>
            <div>
            { !confirmed ? (
            <button
                onClick={() => handleConfirm()}
                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
                Confirm
            </button>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 text-sm leading-5 font-medium rounded-full text-green-500 bg-white"
                >Confirmed</span>
            ) }
            </div>
        </div>
        </li>
        
    )
}