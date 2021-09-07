import React from "react";
import { NextPage } from "next";

export const RegisterSection : NextPage = () => {
    return (
        <div className="h-full flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:p-20 xl:p-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="w-20 h-20 rounded-md bg-indigo-600"></div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign in to your account
                </a>
              </p>
            </div>
      
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input 
                            id="email" 
                            name="email" 
                            type="text" 
                            autoComplete="text" 
                            required 
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                    </div>
                  </div>
      
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="retype-password" className="block text-sm font-medium text-gray-700">
                      Retype your password
                    </label>
                    <div className="mt-1">
                      <input id="retype-password" name="retype-password" type="password" autoComplete="retype-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>                  
      
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="tos" name="tos" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                      />
                      <label htmlFor="tos" className="ml-2 block text-sm text-gray-900">
                        Agree to <a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">terms of service</a>.
                      </label>
                    </div>
                  </div>
      
                  <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create account
                    </button>
                  </div>
                </form>
              </div>

          </div>
        </div>        
    )
}