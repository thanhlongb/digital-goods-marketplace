import React, { useRef } from "react";
import { ProductReviewCard } from "./ProductReviewCard";
import { Alert } from '../../elements/Alert';
import { useState } from "react";
import { Rating } from 'react-simple-star-rating'
import axios from "axios";
import { API_PRODUCT_SERVICE } from "../../../utils/constants";
import { useSession } from "next-auth/client";

type ProductReviewsSectionProps = {
  productId: number,
  reviews?: any[],
  isOwner?: boolean
}

const ProductReviewsSection = ({
  productId,
  reviews,
  isOwner
} : ProductReviewsSectionProps) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const reviewForm = useRef(null);
  const [session, loading] = useSession();
  const user = (session ? session.user : null);
  const handleRating = (rate:any) => {
    setRating(rate);
    console.log(rate);
  };
  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://${API_PRODUCT_SERVICE}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        "rating": rating,
        "content": review,
        "productid": productId,
        "reviewer": user?.name 
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(review => {
      reviews?.push(review);
      setRating(0);
      setReview("");
    })
  }

    return (
  
    <div className="space-y-6 pt-4 lg:pt-0 lg:col-span-9">
        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                  Reviews
              </h2>
          </div>         
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:px-6">
              { (reviews && reviews.length > 0) ? (
                <ul className="space-y-8">
                  {reviews.map((review) => (
                      <ProductReviewCard key={review.id} review={review} />
                  ))}  
                </ul>
              ) : (
                  <Alert message="No review found." />
              ) }   
            </div>
          </div>

        { user !== null && !isOwner ? (
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex space-x-3">         
                <div className="min-w-0 flex-1">
                  <form ref={reviewForm} onSubmit={handleReviewSubmit}>
                    <div>
                      <label htmlFor="review" className="sr-only">Review</label>
                      <textarea id="review" 
                        onChange={(e) => setReview(e.target.value)}
                        name="review" 
                        rows={3} 
                        value={review}
                        className="p-2 shadow-sm block w-full focus:ring-blue-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" placeholder="Add a review"></textarea>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                        Select a rating:
                        <Rating onClick={handleRating} 
                                ratingValue={rating} 
                                transition={true} 
                                className="ml-2 flex">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>                        
                        </Rating>
                      </div>
                      <button type="submit"
                              disabled={review.length === 0 || rating === 0} 
                              className={`${review.length === 0 || rating === 0 ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-600"} inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                        Submit review
                      </button>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        ) : null }
      </div>
    </div>
    )
}

export default ProductReviewsSection