// src/components/CourseCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ add this import

function CourseCard({
  id,
  categoryName, 
  imageUrl,
  title,
  instructorName,
  rating = 0,
  totalHours,
  numberOfLectures,
  level,
  price,
}) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRating = (value) => setCurrentRating(value);

  const getLevelText = (lvl) => {
    switch (lvl) {
      case 0:
        return "Beginner";
      case 1:
        return "Intermediate";
      case 2:
        return "Advanced";
      default:
        return "Unknown";
    }
  };

  const imageSrc = imageUrl?.startsWith("http")
    ? imageUrl
    : `http://courseplatform.runasp.net${imageUrl}`;

  return (
    <Link
      to={`/course/${id}`} // ✅ navigate to the course detail page dynamically
      className="block bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200"
    >
      {/* Course Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-40 object-cover"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        {categoryName && (
          <span className="absolute top-3 left-3 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            {categoryName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">By {instructorName}</p>

        {/* Interactive Rating */}
        <div className="flex items-center text-sm mb-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`cursor-pointer text-xl transition-colors ${
                value <= currentRating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); // prevent navigation when rating clicked
                handleRating(value);
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {totalHours} Total Hours · {numberOfLectures} Lectures · {getLevelText(level)}
        </p>

        <p className="text-lg font-bold text-gray-900">${price}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
