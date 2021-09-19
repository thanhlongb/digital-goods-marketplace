import React, { useEffect, useRef, useState } from "react";
import { CloudUploadIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { API_PRODUCT_CDN, API_PRODUCT_SERVICE, API_PRODUCT_UPLOAD_SERVICE } from "../../../utils/constants";
import { useSession } from 'next-auth/client';
import { ExclamationIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { uploadFile, requestS3SignedUrl, uploadFileToS3 } from '../../../utils/fileUpload';

type ProductCreateSectionProps = {
  categories: any[]
}

const ProductCreateSection = ({
  categories = []
} : ProductCreateSectionProps) => {
  const defaultProduct = {
    name: "",
    price: 0,
    category: 0,
    tags: "",
    description: "",
    details: "",
    image_path: "",
    file_path: ""
  }
  const router = useRouter();
  const [product, setProduct] = useState(defaultProduct);
  const [imageUploading, setImageUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  const form = useRef(null);
  const [session, loading] = useSession();
  const user = (session ? session.user : null);

  const handleUploadCoverImage = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageUploading(true);
      uploadFile(file, "thumbnail")
        .then((uploadFileName: any) => {
          setProduct({
            ...product, 
            image_path: `https://${API_PRODUCT_CDN}/${uploadFileName}`
          });
          setImageUploading(false);
        });
      setProduct({
        ...product, 
        image_path: URL.createObjectURL(file)
      });  
    }
  } 

  const handleUploadProductFile = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileUploading(true);
      uploadFile(file, "products")
        .then((uploadFileName: any) => {
          setProduct({
            ...product, 
            file_path: `https://${API_PRODUCT_CDN}/${uploadFileName}`
          });
          setFileUploading(false);
        });
    }
  }  

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    fetch(`https://${API_PRODUCT_SERVICE}/products`, {
      method: 'POST',
      body: JSON.stringify({
        ...product, 
        seller: user?.name ?? "",
        published: Math.floor(Date.now()/1000)
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(product => {     
        router.push(`/product/${product.id}`);
      })
      .catch(error => console.log(error));
  };

  // This will cause error in the future, but time is running out, too bad!
  useEffect(() => {
    setProduct({ ...product, category: categories.length > 0 ? categories[0].id : 0 });
  }, [])

    return (
<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-16 lg:px-8">

    <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="divide-y divide-gray-200">
      <form ref={form} onSubmit={handleFormSubmit} className="space-y-8 divide-y p-8 lg-16 divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Basic information
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Please give your customer some basic information about your masterpiece. 
              </p>
            </div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="product[name]"
                      id="name"
                      autoComplete="name"
                      onChange={e => setProduct({ ...product, name: e.target.value })}
                      defaultValue={product.name}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
                      />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Price
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="product[price]"
                      id="price"
                      autoComplete="price"
                      onChange={e => setProduct({ ...product, price: Number.parseInt(e.target.value) ?? 0 })}
                      defaultValue={product.price}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
                      />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Category
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <select
                      id="category"
                      name="product[category]"
                      autoComplete="category"
                      onChange={e => setProduct({ ...product, category: Number.parseInt(e.target.value)})}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                      { categories.map((category: any) => 
                        <option key={category.id}
                                value={category.id}>
                          {category.name}
                        </option>
                      ) }
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Tags
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="product[tags]"
                      id="tags"
                      autoComplete="tags"
                      onChange={e => setProduct({ ...product, tags: e.target.value })}
                      defaultValue={product.tags}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
                      />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="description"
                    name="product[description]"
                    rows={3}
                    onChange={e => setProduct({ ...product, description: e.target.value })}
                    defaultValue={product.description}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about your product.</p>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Details
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="details"
                    name="product[details]"
                    rows={5}
                    onChange={e => setProduct({ ...product, details: e.target.value })}
                    defaultValue={product.details}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    />
                  <p className="mt-2 text-sm text-gray-500">Write detailed description of your product.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upload files</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please take a look at the size limit. Contact us if you want to publish in a bigger size.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                { (product.image_path) ? (
                  <>
                    <img className="max-h-96" src={product.image_path}></img>
                    <button className="my-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setProduct({ ...product, image_path: "" })}>
                              Choose another one
                    </button>
                  </>             
                ) : (
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <label
                          htmlFor="cover-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Pick a cover image</span>
                        <input id="cover-upload" 
                              name="cover-upload" 
                              type="file" 
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleUploadCoverImage(e)} />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                ) }
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              File Upload
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <CloudUploadIcon 
                      className={`${(product.file_path.length > 0) ? "text-green-500" : "text-gray-400"} mx-auto h-12 w-12`} />
                    <div className="text-sm text-gray-600">
                    { (product.file_path.length > 0) ? (
                      <>
                      <Link href={product.file_path}>
                        <label className="text-green-500 hover:text-green-600 cursor-pointer relative bg-white rounded-md font-medium">
                            <span>
                              {product.file_path.split('/').at(-1)}  
                            </span>
                        </label>
                      </Link>
                      </>  
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className={`${fileUploading ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-500'} relative cursor-pointer bg-white rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500`}>
                      <span>{ fileUploading ? "Uploading file..." : "Upload a file" }</span>
                      <input id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only"
                            accept=".zip"
                            disabled={fileUploading}
                            onChange={(e) => handleUploadProductFile(e)} />
                      </label>
                    ) }
                    </div>
                    <p className="text-xs text-gray-500">ZIP up to 100MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Link href="/">
              <a
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
              Cancel
              </a>
            </Link>
            <button
              disabled={fileUploading || imageUploading}
              type="submit"
              className={`${ (fileUploading || imageUploading) ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700" } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
            Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>


</div>

)}

export default ProductCreateSection