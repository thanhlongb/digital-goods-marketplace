import React from "react";
import ReactMarkdown from "react-markdown";

// TODO: parse makrdown
type ProductDetailsSectionProps = {
    product: any
}

const ProductDetailsSection = ({
    product
} : ProductDetailsSectionProps) => {
    return (

        <div className="space-y-6 pt-4 lg:pt-0 lg:col-span-9">
            <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
                {/* <div className="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    Product Details
                </h2>
                </div> */}
                <article className="prose max-w-none border-t border-gray-200 px-4 py-5 text-base text-gray-900 sm:px-6">
                    <ReactMarkdown>
                        { product.details ?? 'No detail found.' }
                    </ReactMarkdown>
                </article>
            </div>
            </section>
        </div>

    )
}

export default ProductDetailsSection