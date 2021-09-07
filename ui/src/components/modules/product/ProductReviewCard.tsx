import React from "react";
import { StarIcon } from '@heroicons/react/solid'
const { DateTime } = require("luxon");
import Link from "next/link";

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}  

type ProductReviewCardProps = {
    review: any
}

export const ProductReviewCard = ({
    review
} : ProductReviewCardProps) => {
    return (

      <li>
        <div className="flex space-x-3">
          {/* <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" 
                 src={review.reviewer.imageUrl} 
                 alt={review.reviewer.name} />
          </div> */}
          <div>
            <div className="mt-1 text-sm text-gray-700">
              <p>
                <Link href={`/user/${review.reviewer}`}>
                  <a className="font-bold text-indigo-500 hover:text-indigo-700 rounded-full pr-2 py-1">
                    @{review.reviewer}
                  </a>
                </Link>
                {review.content}
              </p>
            </div>
            <div className="flex mt-2 text-sm space-x-2">
              <span className="flex-shrink-0 flex text-gray-500">
                {[...Array(5)].map((_, star) => ( 
                    <StarIcon key={_}
                              className={classNames((star < review.rating) ? 'text-yellow-400' : '', "h-5 w-5 ")} 
                              aria-hidden="true" />
                ))}
              </span>
              <span className="text-gray-500 font-medium">&middot;</span>
              <span className="text-gray-500 font-medium">
              { review.date ? DateTime.fromSeconds(review.date).toRelativeCalendar() : null}
              </span>
            </div>
          </div>
        </div>
      </li>
        
    )
}