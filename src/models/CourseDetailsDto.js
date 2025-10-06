// Course Details DTO model
export const CourseDetailsDto = {
  id: 0,
  title: '',
  description: '',
  releaseDate: '',
  instructorName: null,
  instructorImage: null,
  categoryName: null,
  certificate: '',
  price: 0,
  level: 0,
  rating: 0,
  numberOfLectures: 0,
  totalHours: 0,
  imageUrl: '',
  categoryId: 0,
  instructorId: 0,
  isBought: false,
  isInCart: false,
};

// Lecture DTO model
export const LectureDto = {
  id: 0,
  title: '',
  order: 0,
  durationMinutes: 0,
  courseId: 0,
};

// Course Level enum mapping
export const CourseLevelMap = {
  0: 'Beginner',
  1: 'Intermediate', 
  2: 'Expert',
  3: 'All levels',
};

// Helper function to get level text
export const getLevelText = (level) => {
  return CourseLevelMap[level] || 'All levels';
};
