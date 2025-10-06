import React from 'react';
import { Star } from 'lucide-react';

const LearnerReviews = () => {
  // Static data for the reviews
  const reviewsData = {
    totalReviews: 146951,
    averageRating: 4.6,
    ratingBreakdown: [
      { stars: 5, percentage: 80 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
    reviews: [
      {
        id: 1,
        name: 'Mark Doe',
        rating: 5,
        date: '22nd March, 2024',
        review:
          'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      },
      {
        id: 2,
        name: 'Mark Doe',
        rating: 5,
        date: '22nd March, 2024',
        review:
          'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      },
      {
        id: 3,
        name: 'Mark Doe',
        rating: 5,
        date: '22nd March, 2024',
        review:
          'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      },
    ],
  };

  // Star rating component
  const StarRating = ({ rating, showNumber = false }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      {showNumber && <span className="ml-1 text-sm font-medium">{rating}</span>}
    </div>
  );

  // Rating bar component
  const RatingBar = ({ stars, percentage }) => (
    <div className="flex items-center gap-2 text-sm">
      <StarRating rating={stars} />
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-gray-600 w-8 text-right">{percentage}%</span>
    </div>
  );

  return (
    <div className="w-[85%] ml-8 p-4 bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Learner Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-30">
        {/* Left side - Rating summary */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold text-gray-900">
              {reviewsData.averageRating}
            </span>
            <span className="text-gray-600 text-sm">
              {reviewsData.totalReviews.toLocaleString()} reviews
            </span>
          </div>

          <div className="space-y-2">
            {reviewsData.ratingBreakdown.map((item) => (
              <RatingBar
                key={item.stars}
                stars={item.stars}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>

        {/* Right side - Individual reviews */}
        <div className="space-y-4">
          {reviewsData.reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} showNumber={true} />
                    <span className="text-xs text-gray-500">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.review}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* View more reviews button */}
          <div className="flex justify-start pt-3">
            <button className="border border-black rounded-md text-sm text-black px-4 py-1.5 hover:bg-gray-50 transition m-5">
              View more Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerReviews;
