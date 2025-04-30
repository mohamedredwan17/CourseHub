export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  title?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
};

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  level: CourseLevel;
  instructor: User;
  duration: string; // e.g., "10h 30m"
  lessons: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  categories: Category[];
  updatedAt: string;
  isBestseller?: boolean;
  isNew?: boolean;
};

export type Section = {
  id: string;
  title: string;
  courseId: string;
  order: number;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  sectionId: string;
  duration: string;
  videoUrl?: string;
  isPreview: boolean;
  order: number;
  completed?: boolean;
};

export type Review = {
  id: string;
  courseId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
};

export type Enrollment = {
  id: string;
  courseId: string;
  course: Course;
  userId: string;
  enrollmentDate: string;
  progress: number;
  completedLessons: string[];
};