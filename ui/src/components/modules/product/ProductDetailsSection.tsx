import React from "react";
import ReactMarkdown from "react-markdown";

type ProductDetailsSectionProps = {
    product: any
}

const ProductDetailsSection = ({
    product
} : ProductDetailsSectionProps) => {
    const tags = (product?.tags ?? "").split(",")
    return (
        <div className="space-y-6 pt-4 lg:pt-0 lg:col-span-9">
            <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                        Product Details
                    </h2>
                </div>
                <article className="prose max-w-none px-4 py-5 text-base text-gray-900 sm:px-6">
                    <ReactMarkdown>
                        { product.details ?? 'No detail found.' }
                    </ReactMarkdown>
                    <p className="w-full space-y-2 font-medium text-white">
                        <span className="text-gray-900">Tags: </span>
                        { tags.map((tag:string, index: number) => (
                            <span key={index}
                             className="inline-block mr-2 px-3 py-1 rounded-full bg-blue-500">
                                { tag }
                            </span>
                        ))}
                    </p>
                </article>
            </div>
            </section>
        </div>

    )
}

export default ProductDetailsSection