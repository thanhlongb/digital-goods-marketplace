import React from "react";
import { NextPage } from "next";
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Link from "next/link";

export const CallToActionBusinessSection : NextPage<any> = () => {
    return (
      <div className="relative bg-gray-900">
        <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
          <img className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1428&q=80" 
                alt="" />
        </div>
        <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
              Passive income opportunity
            </h2>
            <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start your online business with us.
            </p>
            <p className="mt-3 text-lg text-gray-300">
            Want to share your masterpieces to the community? <br /> 
            Just a few steps to publish your product. No additional fee required!
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link href="/">
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Start selling
                    <ExternalLinkIcon className="-mr-1 ml-2 h-5 w-5 text-gray-200" aria-hidden="true" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}