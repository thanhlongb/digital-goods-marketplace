import React from "react";
import { Alert } from '../../elements/Alert';
import { ProductPurchaseCard } from "./ProductPurchaseCard";

type ProductPurchaseConfirmSectionProps = {
  productId: number,
  purchases?: any[]
}

const ProductPurchaseConfirmSection = ({
  productId,
  purchases
} : ProductPurchaseConfirmSectionProps) => {

    return (
      <div className="space-y-6 pt-4 lg:pt-0 lg:col-span-9">
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    Pending Purchases
                </h2>
            </div>      
            <div className="sm:rounded-lg p-4">
                  {(purchases && purchases.length > 0) ? (
                  <ul className="-my-5 divide-y divide-gray-200">
                    {purchases.map((purchase) => (
                      <ProductPurchaseCard key={purchase.id} purchase={purchase} />
                    ))}                    
                  </ul>
                  ) : (
                    <Alert message="No pending purchase." />
                  ) }
            </div>
          </div>
        </section>
    </div>      
    )
}

export default ProductPurchaseConfirmSection