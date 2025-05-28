"use client";

import { useState } from 'react';
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// interface ProductReview {
//   id: string;
//   productName: string;
//   reviewerName: string;
//   rating: number;
//   comment: string;
// }

const ProductReviews = () => {
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Review:', { reviewerName, rating, comment, productName });
    setReviewerName('');
    setRating(5);
    setComment('');
    setProductName('');
  };

  return (
    <div className="w-full py-12  text-white flex flex-col z-[50]">
      <ToastContainer position="top-center" theme="colored" />

      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Product Reviews</h2>
        
        {/* <div className="space-y-8 mb-12">
          {dummyReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <p className="text-lg font-semibold text-gray-900 mr-4">{review.reviewerName}</p>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}{ '☆'.repeat(5 - review.rating)}</span>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <p className="text-sm text-gray-600">Review for Product ID: {review.productId}</p>
            </div>
          ))}
        </div> */}

        <div className="mt-8 bg-[#101033] p-6 rounded-lg shadow w-full">
          <h3 className="text-xl font-semibold text-white mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmitReview} className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-300">Product ID</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-300">Your Name</label>
              <input
                type="text"
                id="reviewerName"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-300">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value, 10))}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                required
              >
                {/* {[☆, ☆, ☆, ☆, ☆].map(num => <option key={num} value={num}>{num} Stars</option>)} */}
                
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Comment</label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProductReviews;
