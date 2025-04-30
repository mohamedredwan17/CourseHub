import { Category, Course, User, Section, Lesson, Review, Enrollment } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'instructor',
    bio: 'Senior Web Developer with 10+ years of experience teaching web technologies.',
    title: 'Senior Web Developer & Instructor',
  },
  {
    id: '2',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'instructor',
    bio: 'Full-stack developer and educator with passion for teaching programming concepts.',
    title: 'Full-stack Developer & Technical Trainer',
  },
  {
    id: '3',
    name: 'Kareem Mahmoud',
    email: 'kareem.m@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student',
  },
  {
    id: '4',
    name: 'Sarah Ahmad',
    email: 'sarah.a@example.com',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student',
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Web Development', slug: 'web-development', count: 15 },
  { id: '2', name: 'Mobile Development', slug: 'mobile-development', count: 10 },
  { id: '3', name: 'Data Science', slug: 'data-science', count: 8 },
  { id: '4', name: 'UI/UX Design', slug: 'ui-ux-design', count: 7 },
  { id: '5', name: 'Business', slug: 'business', count: 12 },
  { id: '6', name: 'Marketing', slug: 'marketing', count: 9 },
  { id: '7', name: 'Photography', slug: 'photography', count: 5 },
  { id: '8', name: 'IT & Software', slug: 'it-software', count: 14 },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    slug: 'complete-web-development-bootcamp',
    description: 'Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more to help you become a full-stack web developer.',
    shortDescription: 'Master web development with front-end and back-end technologies.',
    price: 199.99,
    discountPrice: 89.99,
    thumbnail: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'all-levels',
    instructor: mockUsers[0],
    duration: '52h 30m',
    lessons: 152,
    rating: 4.8,
    ratingCount: 3458,
    studentsCount: 12475,
    categories: [mockCategories[0]],
    updatedAt: '2023-10-15',
    isBestseller: true,
  },
  {
    id: '2',
    title: 'Advanced React and Redux',
    slug: 'advanced-react-redux',
    description: 'Take your React skills to the next level with this advanced course covering React Hooks, Context API, Redux, and advanced state management techniques.',
    shortDescription: 'Master advanced React concepts and state management.',
    price: 149.99,
    discountPrice: 74.99,
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    instructor: mockUsers[0],
    duration: '28h 15m',
    lessons: 98,
    rating: 4.7,
    ratingCount: 1752,
    studentsCount: 8943,
    categories: [mockCategories[0]],
    updatedAt: '2023-11-05',
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    slug: 'mobile-app-development-react-native',
    description: 'Learn to build native mobile applications for iOS and Android using React Native. This course covers everything from setup to publishing your apps.',
    shortDescription: 'Create mobile apps for iOS and Android with React Native.',
    price: 179.99,
    discountPrice: 79.99,
    thumbnail: 'https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    instructor: mockUsers[1],
    duration: '34h 45m',
    lessons: 120,
    rating: 4.6,
    ratingCount: 1245,
    studentsCount: 6837,
    categories: [mockCategories[1]],
    updatedAt: '2023-09-22',
    isNew: true,
  },
  {
    id: '4',
    title: 'Python for Data Science and Machine Learning',
    slug: 'python-data-science-machine-learning',
    description: 'Master Python and essential libraries like NumPy, Pandas, Matplotlib, and Scikit-Learn to analyze data and build machine learning models.',
    shortDescription: 'Learn Python for data analysis and machine learning.',
    price: 189.99,
    discountPrice: 94.99,
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    instructor: mockUsers[1],
    duration: '42h 20m',
    lessons: 135,
    rating: 4.9,
    ratingCount: 2568,
    studentsCount: 9876,
    categories: [mockCategories[2]],
    updatedAt: '2023-10-30',
    isBestseller: true,
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    slug: 'ui-ux-design-fundamentals',
    description: 'Learn the principles of user interface and user experience design. This course covers design thinking, wireframing, prototyping, and user testing.',
    shortDescription: 'Master the fundamentals of UI/UX design.',
    price: 129.99,
    discountPrice: 64.99,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'beginner',
    instructor: mockUsers[1],
    duration: '26h 15m',
    lessons: 85,
    rating: 4.7,
    ratingCount: 1348,
    studentsCount: 7652,
    categories: [mockCategories[3]],
    updatedAt: '2023-11-12',
    isNew: true,
  },
  {
    id: '6',
    title: 'Complete Digital Marketing Course',
    slug: 'complete-digital-marketing',
    description: 'Master digital marketing strategies including SEO, social media marketing, email marketing, content marketing, and paid advertising.',
    shortDescription: 'Learn comprehensive digital marketing strategies and tactics.',
    price: 159.99,
    discountPrice: 79.99,
    thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'all-levels',
    instructor: mockUsers[0],
    duration: '38h 30m',
    lessons: 110,
    rating: 4.6,
    ratingCount: 2145,
    studentsCount: 8932,
    categories: [mockCategories[5]],
    updatedAt: '2023-08-25',
  }
];

// Mock Sections for Course 1
export const mockSections: Section[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    courseId: '1',
    order: 1,
    lessons: [
      {
        id: '1',
        title: 'Course Overview',
        sectionId: '1',
        duration: '8:30',
        videoUrl: 'https://example.com/video1',
        isPreview: true,
        order: 1,
      },
      {
        id: '2',
        title: 'Setting Up Your Development Environment',
        sectionId: '1',
        duration: '15:45',
        videoUrl: 'https://example.com/video2',
        isPreview: false,
        order: 2,
      },
      {
        id: '3',
        title: 'Web Development Basics',
        sectionId: '1',
        duration: '12:20',
        videoUrl: 'https://example.com/video3',
        isPreview: false,
        order: 3,
      }
    ]
  },
  {
    id: '2',
    title: 'HTML Fundamentals',
    courseId: '1',
    order: 2,
    lessons: [
      {
        id: '4',
        title: 'HTML Document Structure',
        sectionId: '2',
        duration: '14:55',
        videoUrl: 'https://example.com/video4',
        isPreview: true,
        order: 1,
      },
      {
        id: '5',
        title: 'Working with Text Elements',
        sectionId: '2',
        duration: '18:30',
        videoUrl: 'https://example.com/video5',
        isPreview: false,
        order: 2,
      },
      {
        id: '6',
        title: 'Links and Navigation',
        sectionId: '2',
        duration: '16:40',
        videoUrl: 'https://example.com/video6',
        isPreview: false,
        order: 3,
      },
      {
        id: '7',
        title: 'Images and Multimedia',
        sectionId: '2',
        duration: '20:15',
        videoUrl: 'https://example.com/video7',
        isPreview: false,
        order: 4,
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Styling',
    courseId: '1',
    order: 3,
    lessons: [
      {
        id: '8',
        title: 'CSS Syntax and Selectors',
        sectionId: '3',
        duration: '22:10',
        videoUrl: 'https://example.com/video8',
        isPreview: false,
        order: 1,
      },
      {
        id: '9',
        title: 'Box Model and Layout',
        sectionId: '3',
        duration: '25:30',
        videoUrl: 'https://example.com/video9',
        isPreview: false,
        order: 2,
      },
      {
        id: '10',
        title: 'Responsive Design Basics',
        sectionId: '3',
        duration: '28:15',
        videoUrl: 'https://example.com/video10',
        isPreview: false,
        order: 3,
      }
    ]
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    courseId: '1',
    userId: '3',
    user: mockUsers[2],
    rating: 5,
    comment: 'This course is excellent! The instructor explains everything clearly and provides practical examples. I\'ve learned so much already.',
    createdAt: '2023-10-28',
    helpful: 24
  },
  {
    id: '2',
    courseId: '1',
    userId: '4',
    user: mockUsers[3],
    rating: 4,
    comment: 'Great course with lots of valuable information. Some sections could be a bit more detailed, but overall it\'s very good.',
    createdAt: '2023-11-02',
    helpful: 15
  },
  {
    id: '3',
    courseId: '1',
    userId: '4',
    user: mockUsers[3],
    rating: 5,
    comment: 'Comprehensive and well-structured course. The projects are challenging but extremely helpful for learning.',
    createdAt: '2023-09-15',
    helpful: 32
  }
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    courseId: '1',
    course: mockCourses[0],
    userId: '3',
    enrollmentDate: '2023-09-10',
    progress: 35,
    completedLessons: ['1', '2', '3', '4'],
  },
  {
    id: '2',
    courseId: '2',
    course: mockCourses[1],
    userId: '3',
    enrollmentDate: '2023-10-05',
    progress: 20,
    completedLessons: ['1', '2'],
  },
  {
    id: '3',
    courseId: '4',
    course: mockCourses[3],
    userId: '4',
    enrollmentDate: '2023-08-20',
    progress: 75,
    completedLessons: ['1', '2', '3', '4', '5', '6', '7'],
  }
];

// Utility functions
export const getPopularCategories = (): Category[] => {
  return mockCategories.sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 6);
};

export const getFeaturedCourses = (): Course[] => {
  return mockCourses.filter(course => course.isBestseller || course.isNew).slice(0, 4);
};

export const getEnrollmentsForUser = (userId: string): Enrollment[] => {
  return mockEnrollments.filter(enrollment => enrollment.userId === userId);
};

export const getCoursesByCategory = (categoryId: string): Course[] => {
  return mockCourses.filter(course => 
    course.categories.some(category => category.id === categoryId)
  );
};

export const getCourseById = (courseId: string): Course | undefined => {
  return mockCourses.find(course => course.id === courseId);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return mockCourses.find(course => course.slug === slug);
};

export const getCourseSections = (courseId: string): Section[] => {
  return mockSections.filter(section => section.courseId === courseId)
    .sort((a, b) => a.order - b.order);
};

export const getCourseReviews = (courseId: string): Review[] => {
  return mockReviews.filter(review => review.courseId === courseId);
};

export const getInstructorCourses = (instructorId: string): Course[] => {
  return mockCourses.filter(course => course.instructor.id === instructorId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};