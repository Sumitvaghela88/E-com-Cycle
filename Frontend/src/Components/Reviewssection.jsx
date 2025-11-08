import React from 'react';
import { Star } from 'lucide-react';
import Review1 from '../assets/Review1.jpg';
import Review2 from '../assets/Review2.jpg';
import Review3 from '../assets/Review3.jpg';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "James Olly",
      rating: 4.5,
      text: "The equivalent of a 'sport car' in the bike line-up — quick, responsive, great components, and stylish.",
      verified: true,
      image: Review1,
      align: "right",
    },
    {
      id: 2,
      name: "Carol Wilson",
      rating: 5,
      text: "I love them! Don't think I'll go back to rim brakes ever again! Trek is the best!",
      verified: true,
      image: Review2,
      align: "left",
    },
    {
      id: 3,
      name: "Richard Fields",
      rating: 5,
      text: "This bike, from tire to tire, is high quality and the staff and Trek are amazing. Purchased it and the whole experience was wonderful!",
      verified: true,
      image: Review3,
      align: "right",
    },
  ];

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < fullStars
                ? 'fill-black text-black'
                : hasHalfStar && i === fullStars
                ? 'fill-gray-800 text-gray-800 opacity-40'
                : 'text-gray-300'
            } transition-all duration-200`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}/5
        </span>
      </div>
    );
  };

  return (
    <section className=" bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 md:mb-20 text-gray-900 tracking-tight">
          Reviews
        </h2>

        <div className="flex flex-col md:ml-40 space-y-12 md:space-y-28">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                review.align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Reviewer Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Text */}
              <div className="max-w-md text-center md:text-left">
                <StarRating rating={review.rating} />
                <p className="text-gray-700 mt-4 leading-relaxed text-base italic">
                  "{review.text}"
                </p>

                <div className="mt-6">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  {review.verified && (
                    <p className="text-sm text-green-600 mt-1">
                      Verified customer
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}