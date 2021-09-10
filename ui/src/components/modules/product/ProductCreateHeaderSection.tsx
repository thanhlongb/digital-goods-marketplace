import React from "react";

type ProductCreateHeaderSectionProps = {

};

const ProductCreateHeaderSection = ({

} : ProductCreateHeaderSectionProps) => {
    return (

  <div className="bg-gray-900">
      <div className="max-w-7xl py-4 mx-auto px-4 lg:py-8 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
          <span className="block">New product</span>
        </h1>
      </div>
  </div>

    )
}

export default ProductCreateHeaderSection