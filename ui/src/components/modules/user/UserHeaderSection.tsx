import React from "react";
import { NextPage } from "next";
/**
 * TODO: fix image hover bug where it only clickable
 *       when hovering on ourside circle of avatar
 * 
 * Reminder: only show bought products if viewing user is current user
 */
interface UserHeaderSectionProps {
    avatar?: string,
    username: string,
    email: string
}

export const UserHeaderSection : NextPage<UserHeaderSectionProps> = ({
    avatar,
    username,
    email
}) => {
    return (
    <div className="bg-gray-100">
        <div className="max-w-7xl py-4 mx-auto px-4 lg:py-8 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                
                <div className="relative rounded-full overflow-hidden">
                    <img className="relative rounded-full w-20 h-20" src={avatar} alt="" />
                    <label
                        htmlFor="user-photo"
                        className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                    >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                        <input
                            type="file"
                            id="user-photo"
                            name="user-photo"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                        />
                    </label>
                </div>

                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
              <p className="text-sm font-medium text-gray-500">
                  {email}
              </p>
            </div>
          </div>
        </div>
    </div>
    )
}