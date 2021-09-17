import React, { useState } from "react";
import { NextPage } from "next";
import { uploadFile } from '../../../utils/fileUpload';
import axios from 'axios';
import { API_PRODUCT_CDN, API_USER_SERVICE } from '../../../utils/constants';

interface UserHeaderSectionProps {
    avatar?: string,
    username: string,
    email: string,
    isCurrentUser: boolean
}

export const UserHeaderSection : NextPage<UserHeaderSectionProps> = ({
    avatar,
    username,
    email,
    isCurrentUser
}) => {
  const [userAvatar, setUserAvatar] = useState<undefined | string>(avatar);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const handleAvatarUpload = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAvatarUploading(true);
      uploadFile(file, "avatar")
        .then((uploadFileName: any) => {
          axios.patch(`https://${API_USER_SERVICE}/v1/users/${username}/avatar`, {
            avatar: `https://${API_PRODUCT_CDN}/${uploadFileName}`
          })
          .then((response:any) => {
              setAvatarUploading(false)
              setUserAvatar(response.data.avatar ?? avatar)
          })
          .catch(error => console.log(error));
        });
    }
  }
    return (
    <div className="bg-gray-100">
        <div className="max-w-7xl py-4 mx-auto px-4 lg:py-8 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                
                <div className="relative rounded-full overflow-hidden">
                    <img className={`${avatarUploading && "animate-pulse"} relative rounded-full w-20 h-20`} 
                          src={userAvatar} alt={username} />
                    { isCurrentUser && (
                      <label
                          htmlFor="user-photo"
                          className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                      >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                          <input
                              onChange={(e) => handleAvatarUpload(e)}
                              type="file"
                              id="user-photo"
                              name="user-photo"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                          />
                      </label>
                    ) }
                </div>
                {/* <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" /> */}
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