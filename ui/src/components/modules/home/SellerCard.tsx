import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from 'next/link';
import { API_BASE_URL } from "../../../utils/constants";

interface SellerCardProps {
    seller: any
}

export const SellerCard = ({
    seller
} : SellerCardProps) => {
    const [avatar, setAvatar] = useState('');
    // const topSellersParsed = topSellers.map(async (seller:any) => {
    //   // TODO: fix this stupid code blocking =)) 
    //   fetch(`http://${API_BASE_URL}/getUserAvatar`)
    //     .then(response => response.json())
    //     .then(avatar => seller.imageUrl = avatar.imageUrl)
    //   // seller.imageUrl = imageUrl.imageUrl;
    //   return seller;
    // });
    useEffect(() => {
      fetch(`http://${API_BASE_URL}/getUserAvatar`)
        .then(response => response.json())
        .then(avatar => setAvatar(avatar.imageUrl))
    })
    return (
    <li>
      <Link href={`/user/${seller.name}`}>
      <a>
      <div className="flex items-center space-x-4 py-4 px-6 rounded-md transition hover:bg-gray-200 lg:space-x-6">
        <img className="w-16 h-16 rounded-full lg:w-20 lg:h-20" 
              src={avatar} 
              alt={seller.name} />
        <div className="font-medium text-lg leading-6 space-y-1">
          <h3>{seller.name}</h3>
          <p className="text-green-600">{seller.sales} Sales</p>
        </div>
      </div>
      </a>
      </Link>
    </li>

    )
}