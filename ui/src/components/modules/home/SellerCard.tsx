import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { API_USER_SERVICE } from "../../../utils/constants";

interface SellerCardProps {
    name: string,
    sales: number
}

export const SellerCard = ({
    name, 
    sales
} : SellerCardProps) => {
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
      fetch(`https://${API_USER_SERVICE}/v1/users/${name}`)
        .then(response => response.json())
        .then(avatar => setAvatar(avatar.avatar))
    })
    return (
    <li>
      <Link href={`/user/${name}`}>
      <a>
      <div className="flex items-center space-x-4 py-4 px-6 rounded-md transition hover:bg-gray-200 lg:space-x-6">
        <img className="w-16 h-16 rounded-full lg:w-20 lg:h-20" 
              src={avatar} 
              alt={name} />
        <div className="font-medium text-lg leading-6 space-y-1">
          <h3>{name}</h3>
          <p className="text-green-600">{sales} Sales</p>
        </div>
      </div>
      </a>
      </Link>
    </li>

    )
}