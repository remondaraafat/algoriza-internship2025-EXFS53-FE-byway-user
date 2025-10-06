import React, { useState, useRef, useEffect } from 'react';
import LearnerReviews from'../Componenets/LearnerReviews.jsx';
import { useParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import axiosInstance from '../services/axiosInstance.js';
import { getLevelText } from '../models/CourseDetailsDto.js';
import {
  courseDataAtom,
  lecturesDataAtom,
  courseLoadingAtom,
  lecturesLoadingAtom,
  courseErrorAtom,
  lecturesErrorAtom,
  currentCourseIdAtom
} from '../atoms/courseAtom.js';

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState('Description');
  
  // Jotai atoms
  const [courseData, setCourseData] = useAtom(courseDataAtom);
  const [lecturesData, setLecturesData] = useAtom(lecturesDataAtom);
  const [courseLoading, setCourseLoading] = useAtom(courseLoadingAtom);
  const [lecturesLoading, setLecturesLoading] = useAtom(lecturesLoadingAtom);
  const [courseError, setCourseError] = useAtom(courseErrorAtom);
  const [lecturesError, setLecturesError] = useAtom(lecturesErrorAtom);
  const [currentCourseId, setCourseId] = useAtom(currentCourseIdAtom);

  const { id } = useParams();

  // Refs for smooth scrolling
  const descriptionRef = useRef(null);
  const instructorRef = useRef(null);
  const contentRef = useRef(null);
  const reviewsRef = useRef(null);

  // Fetch course data
  const fetchCourseData = async (courseId) => {
    setCourseLoading(true);
    setCourseError(null);
    try {
      const response = await axiosInstance.get(`/api/Courses/${courseId}`);
      if (response.data.success) {
        setCourseData(response.data.data);
      } else {
        setCourseError('Failed to fetch course data');
      }
    } catch (error) {
      setCourseError(error.message || 'Failed to fetch course data');
    } finally {
      setCourseLoading(false);
    }
  };

  // Fetch lectures data
  const fetchLecturesData = async (courseId) => {
    setLecturesLoading(true);
    setLecturesError(null);
    try {
      const response = await axiosInstance.get(`/api/Lecture/Course/${courseId}?pageNumber=1&pageSize=10`);
      if (response.data.success) {
        setLecturesData(response.data.data);
      } else {
        setLecturesError('Failed to fetch lectures data');
      }
    } catch (error) {
      setLecturesError(error.message || 'Failed to fetch lectures data');
    } finally {
      setLecturesLoading(false);
    }
  };

  // Main effect: handle URL param & data loading
  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      setCourseId(numericId);
      fetchCourseData(numericId);
      fetchLecturesData(numericId);
    }
  }, [id, setCourseId]);

  // Component to render star ratings
  const StarRating = ({ rating, showNumber = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`ri-star-fill text-sm ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-200'
            }`}
          />
        ))}
        {showNumber && (
          <span className="ml-1 text-sm font-medium text-yellow-600">{rating}</span>
        )}
      </div>
    );
  };

  // Breadcrumb component
  const Breadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <a href="/courses" className="hover:text-blue-600 text-gray-600">Home</a>
      <i className="ri-arrow-right-s-line text-gray-400 mx-2" />
      <a href="/courses" className="hover:text-blue-600 text-gray-600">Courses</a>
      <i className="ri-arrow-right-s-line text-gray-400 mx-2" />
      <span className="text-blue-600 font-medium">
        {courseData?.title || 'Course Details'}
      </span>
    </nav>
  );

  // Social share icons
  const SocialIcon = ({ icon }) => {
    const iconMap = {
      facebook: 'ri-facebook-fill',
      github: 'ri-github-fill',
      twitter: 'ri-twitter-fill',
      google: 'ri-google-fill',
      microsoft: 'ri-microsoft-fill',
    };
    
    return (
      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <i className={`${iconMap[icon]} text-lg`} />
      </button>
    );
  };

  // Handle tab click and smooth scroll
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    const refs = {
      'Description': descriptionRef,
      'Instructor': instructorRef,
      'Content': contentRef,
      'Reviews': reviewsRef,
    };
    
    const targetRef = refs[tab];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const tabs = ['Description', 'Instructor', 'Content', 'Reviews'];

  // Loading state
  if (courseLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (courseError) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="text-red-600">Error: {courseError}</div>
      </div>
    );
  }

  // No data state
  if (!courseData) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="text-gray-600">No course data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <Breadcrumb />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Course content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {courseData.title}
          </h1>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            {courseData.description}
          </p>
          
          {/* Rating and course info - Using correct API fields */}
          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={courseData.rating} showNumber={true} />
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-600">
              {courseData.totalHours} Total Hours. {courseData.numberOfLectures} Lectures. {getLevelText(courseData.level)}
            </span>
          </div>
          
          {/* Instructor info - Using correct API fields */}
          {courseData.instructorName && (
            <div className="flex items-center gap-3 mb-6">
              {courseData.instructorImage && (
                <img
                  src={`http://courseplatform.runasp.net${courseData.instructorImage}`}

                  alt={courseData.instructorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <span className="text-sm text-gray-600">Created by </span>
                <span className="text-sm font-medium text-blue-600">{courseData.instructorName}</span>
              </div>
            </div>
          )}
          
          {/* Category */}
          {courseData.categoryName && (
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                <span className="text-sm text-gray-700">{courseData.categoryName}</span>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="space-y-12">
            {/* Description Section */}
            <div ref={descriptionRef} className="scroll-mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Course Description
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {courseData.description}
                </p>
              </div>
              
              {courseData.certificate && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Certification
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Upon completion, you will receive: {courseData.certificate}
                  </p>
                </div>
              )}
            </div>
            
            {/* Instructor Section - Using correct API fields */}
            <div ref={instructorRef} className="scroll-mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Instructor</h3>
              
              {courseData.instructorName ? (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">
                    {courseData.instructorName}
                  </h4>
                  <p className="text-gray-600 mb-4">Course Instructor</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    {courseData.instructorImage && (
                      <img
                        src={`http://courseplatform.runasp.net${courseData.instructorImage}`}
                        alt={courseData.instructorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-star-fill text-yellow-400" />
                        <span>Course Rating: {courseData.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-time-line" />
                        <span>Total Hours: {courseData.totalHours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-book-open-line" />
                        <span>Course Level: {getLevelText(courseData.level)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">Instructor information not available</div>
              )}
            </div>
            
            {/* Content Section - Using lectures from API */}
            <div ref={contentRef} className="scroll-mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Content</h3>
              
              {lecturesLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              ) : lecturesData?.items?.length > 0 ? (
                <div className="space-y-4">
                  {lecturesData.items
                    .sort((a, b) => a.order - b.order) // Sort by order
                    .map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{lecture.title}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Lecture {lecture.order}</span>
                        <span>{lecture.durationMinutes} minutes</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Summary info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Total Lectures: {lecturesData.items.length}</span>
                      <span>
                        Total Duration: {lecturesData.items.reduce((total, lecture) => total + lecture.durationMinutes, 0)} minutes
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No lectures available for this course</div>
              )}
              
              {lecturesError && (
                <div className="text-red-600 text-sm">Error loading lectures: {lecturesError}</div>
              )}
            </div>
            

          </div>
          
        </div>
        
        {/* Right side - Course image and purchase */}
        <div className="lg:col-span-1">
          <div className=" top-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {courseData.imageUrl && (
                <img
                  src={`http://courseplatform.runasp.net${courseData.imageUrl}`}
                  alt={courseData.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ${courseData.price}
                </div>
                
                <div className="space-y-3 mb-6">
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      courseData.isInCart 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    disabled={courseData.isInCart}
                  >
                    {courseData.isInCart ? 'In Cart' : 'Add To Cart'}
                  </button>
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      courseData.isBought 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={courseData.isBought}
                  >
                    {courseData.isBought ? 'Purchased' : 'Buy Now'}
                  </button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Share</h4>
                  <div className="flex gap-2">
                    {['facebook', 'github', 'twitter', 'google', 'microsoft'].map((social) => (
                      <SocialIcon key={social} icon={social} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
                  {/* Reviews Section - Empty div as requested */}
            <div ref={reviewsRef} className="scroll-mt-6">
              <LearnerReviews/>
            </div>
    </div>
  );
};

export default CourseDetail;
