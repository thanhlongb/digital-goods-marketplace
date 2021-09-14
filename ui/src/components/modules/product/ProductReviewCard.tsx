import React from "react";
import { StarIcon } from '@heroicons/react/solid'
const { DateTime } = require("luxon");
import Link from "next/link";
import { RatingView } from "react-simple-star-rating";

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
              <span className="flex-shrink-0 flex space-x-0 text-gray-500">
                <RatingView ratingValue={review.rating}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>                    
                </RatingView>
              </span>
              {/* <span className="text-gray-500 font-medium">&middot;</span>
              <span className="text-gray-500 font-medium">
              { review.date ? DateTime.fromSeconds(review.date).toRelativeCalendar() : null}
              </span> */}
            </div>
          </div>
        </div>
      </li>
        
    )
}