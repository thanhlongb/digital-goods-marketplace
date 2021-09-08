import React, { useState } from "react";
import { CloudUploadIcon, PhotographIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import axios from 'axios';

type ProductCreateSectionProps = {

}
 

const ProductCreateSection = ({

} : ProductCreateSectionProps) => {
  const [files, setFiles] = useState(Object());
  const [imageCoverUrl, setImageCoverUrl] = useState("");
  const fetchS3SignedUrl = async () => (
    fetch("https://g75sn645ai.execute-api.ap-southeast-1.amazonaws.com/uploads")
      .then(response => response.json())
      .catch(error => console.log(error))
  )
  const uploadImageToS3 = () => {
      // fetch(signedUrl.uploadURL)
      //   .then(response => {
      //     if (response.status == 200) console.log("uploaded");
      //   })
      //   .catch(error => console.log(error));
  }
    
  
  const handleUploadCoverImage = (e: any) => {
    if (e.target.files) {
      setImageCoverUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageCoverUrl("");
    }
  }    

    return (
<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-16 lg:px-8">
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="divide-y divide-gray-200">
      <form className="space-y-8 divide-y p-8 lg-16 divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Basic information
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                { JSON.stringify(files) }
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
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
                      name="name"
                      id="name"
                      autoComplete="name"
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
                      name="price"
                      id="price"
                      autoComplete="price"
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
                      name="category"
                      autoComplete="category"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                      <option>Images</option>
                      <option>Videos</option>
                      <option>Audios</option>
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
                      name="tags"
                      id="tags"
                      autoComplete="tags"
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
                      />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="overview" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Overview
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="overview"
                    name="overview"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                    />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about your product.</p>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="overview" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="overview"
                    name="overview"
                    rows={5}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
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
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                { (imageCoverUrl) ? (
                  <>
                    <img className="max-h-96" src={imageCoverUrl}></img>
                    <button className="my-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setImageCoverUrl("")}>
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
                    <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
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
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
            Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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