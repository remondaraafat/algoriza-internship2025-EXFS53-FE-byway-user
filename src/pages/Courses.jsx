// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import { getAllCourses, filterCourses } from "../services/courseService";
import CourseCard from "../Componenets/CourseCard.jsx";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    Name: "",
    Rating: "",
    MinLectures: "",
    MaxLectures: "",
    MinPrice: 0,
    MaxPrice: 980,
    CategoryId: [],
    SortBy: 1,
    PageNumber: 1,
    PageSize: 9,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !filters.Name &&
        !filters.Rating &&
        !filters.MinLectures &&
        !filters.MaxLectures &&
        filters.CategoryId.length === 0 &&
        filters.MinPrice === 0 &&
        filters.MaxPrice === 980 &&
        filters.SortBy === 1
      ) {
        fetchAllCourses();
      } else {
        applyFilters();
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [filters]);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const res = await getAllCourses(filters.PageNumber, filters.PageSize);
      const items = res.data.data.items || [];
      setCourses(items);
      setHasMore(items.length === filters.PageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const res = await filterCourses(filters);
      const items = res.data.data.items || [];
      setCourses(items);
      setHasMore(items.length === filters.PageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (hasMore) setFilters((prev) => ({ ...prev, PageNumber: prev.PageNumber + 1 }));
  };

  const handlePrev = () => {
    if (filters.PageNumber > 1)
      setFilters((prev) => ({ ...prev, PageNumber: prev.PageNumber - 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 text-left m-2 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>
        <p className="text-gray-600">All Development Courses</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 bg-white m-2">
          <div className="flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-md w-fit mb-4">
            <i className="ri-filter-3-line"></i> Filter
        </div>


          {/* Rating */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setFilters({ ...filters, Rating: star, PageNumber: 1 })}
                  className={`cursor-pointer text-2xl ${
                    star <= filters.Rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Lectures */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Number of Lectures</h3>
            {["1-15", "16-30", "31-45", "More than 45"].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name="lectures"
                  value={opt}
                  onChange={() => {
                    if (opt === "1-15")
                      setFilters({ ...filters, MinLectures: 1, MaxLectures: 15, PageNumber: 1 });
                    if (opt === "16-30")
                      setFilters({ ...filters, MinLectures: 16, MaxLectures: 30, PageNumber: 1 });
                    if (opt === "31-45")
                      setFilters({ ...filters, MinLectures: 31, MaxLectures: 45, PageNumber: 1 });
                    if (opt === "More than 45")
                      setFilters({ ...filters, MinLectures: 46, MaxLectures: "", PageNumber: 1 });
                  }}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="980"
              value={filters.MaxPrice}
              onChange={(e) =>
                setFilters({ ...filters, MaxPrice: Number(e.target.value), PageNumber: 1 })
              }
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              ${filters.MinPrice} - ${filters.MaxPrice}
            </p>
          </div>

          {/* Category */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
            {["Frontend", "Backend", "Testing", "UI/UX Design"].map((cat, idx) => {
              const value = idx + 1;
              return (
                <label key={idx} className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    value={value}
                    checked={filters.CategoryId.includes(value)}
                    onChange={() => {
                      setFilters((prev) => {
                        const exists = prev.CategoryId.includes(value);
                        return {
                          ...prev,
                          PageNumber: 1,
                          CategoryId: exists
                            ? prev.CategoryId.filter((id) => id !== value)
                            : [...prev.CategoryId, value],
                        };
                      });
                    }}
                  />
                  {cat}
                </label>
              );
            })}
          </div>
        </div>

        {/* Courses List */}
        <div className="w-full md:w-3/4">
          {/* Sorting */}
          <div className="flex justify-end mb-4">
            <select
              value={filters.SortBy}
              onChange={(e) =>
                setFilters({ ...filters, SortBy: Number(e.target.value), PageNumber: 1 })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            >
              <option value="1">Latest</option>
              <option value="2">Oldest</option>
              <option value="3">Highest Price</option>
              <option value="4">Lowest Price</option>
            </select>
          </div>

          {/* Grid of Courses */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                  courses.map((course) => <CourseCard key={course.id} {...course} />)
                ) : (
                  <p className="col-span-3 text-center text-gray-500">No courses found.</p>
                )}
              </div>

              {/* Simple Pagination Bar */}
              {courses.length > 0 && (
                <div className="flex justify-center mt-10">
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 space-x-3">
                    {/* Left Arrow */}
                    <button
                      onClick={handlePrev}
                      disabled={filters.PageNumber === 1}
                      className={`text-lg ${
                        filters.PageNumber === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:text-black"
                      }`}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>

                    {/* Page Numbers */}
                    {[...Array(filters.PageNumber + (hasMore ? 1 : 0))].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFilters({ ...filters, PageNumber: i + 1 })}
                        className={`px-3 py-1 text-sm border border-gray-200 rounded-md ${
                          filters.PageNumber === i + 1
                            ? "bg-black text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    {/* Right Arrow */}
                    <button
                      onClick={handleNext}
                      disabled={!hasMore}
                      className={`text-lg ${
                        !hasMore
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:text-black"
                      }`}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
