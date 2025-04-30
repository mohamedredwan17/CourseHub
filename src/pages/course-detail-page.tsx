import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Award, 
  User, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  Lock, 
  FileText, 
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  getCourseBySlug, 
  getCourseSections, 
  getCourseReviews 
} from '../data/mock-data';
import { formatPrice, calculateDiscount } from '../lib/utils';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug || '');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-8">Sorry, the course you're looking for doesn't exist.</p>
        <Link to="/courses">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  const sections = getCourseSections(course.id);
  const reviews = getCourseReviews(course.id);
  const discount = calculateDiscount(course.price, course.discountPrice);
  
  const totalLessons = sections.reduce((total, section) => total + section.lessons.length, 0);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prevState => {
      if (prevState.includes(sectionId)) {
        return prevState.filter(id => id !== sectionId);
      } else {
        return [...prevState, sectionId];
      }
    });
  };

  return (
    <div className="bg-white">
      {/* Course Header */}
      <div className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-bold sm:text-4xl">{course.title}</h1>
              <p className="mt-4 text-lg">{course.shortDescription}</p>
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {course.isBestseller && (
                  <Badge variant="warning">Bestseller</Badge>
                )}
                {course.isNew && (
                  <Badge variant="success">New</Badge>
                )}
                <span className="flex items-center">
                  <span className="font-bold text-amber-400">{course.rating.toFixed(1)}</span>
                  <div className="ml-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-600 text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm">({course.ratingCount} ratings)</span>
                </span>
                <span>{course.studentsCount} students</span>
              </div>
              
              <div className="mt-4">
                <span>Created by </span>
                <Link to={`/instructor/${course.instructor.id}`} className="font-medium hover:underline">
                  {course.instructor.name}
                </Link>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <FileText className="mr-1 h-4 w-4" />
                  {totalLessons} lessons
                </span>
                <span className="flex items-center">
                  <Award className="mr-1 h-4 w-4" />
                  {course.level.replace('-', ' ')}
                </span>
                <span>Last updated {course.updatedAt}</span>
              </div>
            </div>
            
            <div className="mt-8 lg:col-span-4 lg:mt-0">
              <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="aspect-video w-full rounded-md object-cover"
                />
                
                <div className="mt-4">
                  <div className="flex items-center">
                    {course.discountPrice ? (
                      <>
                        <span className="text-3xl font-bold">{formatPrice(course.discountPrice)}</span>
                        <span className="ml-2 line-through text-lg text-gray-400">
                          {formatPrice(course.price)}
                        </span>
                        {discount && (
                          <Badge className="ml-2" variant="success">
                            {discount}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <Link to="/checkout">
                    <Button size="lg" className="w-full">Enroll Now</Button>
                    </Link>
                    <p className="text-center text-sm">30-Day Money-Back Guarantee</p>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">This course includes:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-center">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {course.duration} of on-demand video
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {totalLessons} lessons
                      </li>
                      <li className="flex items-center">
                        <Award className="mr-2 h-4 w-4" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            {/* Course Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold">Course Description</h2>
              <div className="mt-4 prose max-w-none">
                <p>{course.description}</p>
              </div>
            </section>
            
            {/* Course Content/Curriculum */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold">Course Content</h2>
              <div className="mt-2 text-sm text-gray-600">
                <span>{sections.length} sections</span>
                <span className="mx-1">•</span>
                <span>{totalLessons} lectures</span>
                <span className="mx-1">•</span>
                <span>{course.duration} total length</span>
              </div>
              
              <div className="mt-4 border rounded-lg overflow-hidden">
                {sections.map((section) => (
                  <div key={section.id} className="border-b last:border-b-0">
                    <button
                      className="flex w-full items-center justify-between bg-gray-50 p-4 text-left font-medium"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div>
                        <span>{section.title}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          {section.lessons.length} lectures
                        </span>
                      </div>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    
                    {expandedSections.includes(section.id) && (
                      <ul className="divide-y">
                        {section.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center p-4">
                            {lesson.isPreview ? (
                              <PlayCircle className="mr-2 h-5 w-5 text-blue-600" />
                            ) : (
                              <Lock className="mr-2 h-5 w-5 text-gray-500" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">
                                {lesson.title}
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="ml-2">Preview</Badge>
                                )}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Instructor */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="mt-4 rounded-lg border p-6">
                <div className="flex items-start">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      <Link to={`/instructor/${course.instructor.id}`} className="hover:underline">
                        {course.instructor.name}
                      </Link>
                    </h3>
                    {course.instructor.title && (
                      <p className="text-gray-600">{course.instructor.title}</p>
                    )}
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <User className="mr-1 h-4 w-4" />
                      <span>{Math.floor(Math.random() * 20000)} students</span>
                      <span className="mx-2">•</span>
                      <span>{Math.floor(Math.random() * 20)} courses</span>
                    </div>
                    
                    {course.instructor.bio && (
                      <p className="mt-4 text-gray-700">{course.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Reviews */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="mt-2 flex items-center">
                <span className="text-lg font-bold">{course.rating.toFixed(1)}</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(course.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({course.ratingCount} ratings)</span>
              </div>
              
              <div className="mt-6 space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{review.user.name}</p>
                        <div className="mt-1 flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs text-gray-500">{review.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                    <div className="mt-2 flex items-center text-sm">
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="mt-12 lg:col-span-4 lg:mt-0">
            {/* Sidebar - Related Courses */}
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Related Courses</h3>
                <div className="mt-4 space-y-4">
                  {/* Display a few related courses from same category */}
                  {course.categories[0] && course.categories[0].id && 
                    getCourseBySlug('advanced-react-redux') && (
                    <div className="flex rounded-lg border p-3 hover:shadow-md">
                      <img
                        src={getCourseBySlug('advanced-react-redux')?.thumbnail}
                        alt={getCourseBySlug('advanced-react-redux')?.title}
                        className="h-16 w-28 rounded object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium line-clamp-2">
                          {getCourseBySlug('advanced-react-redux')?.title}
                        </h4>
                        <div className="mt-1 flex items-center">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-xs text-gray-600">
                            {getCourseBySlug('advanced-react-redux')?.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium">
                          {formatPrice(getCourseBySlug('advanced-react-redux')?.discountPrice || 0)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {getCourseBySlug('python-data-science-machine-learning') && (
                    <div className="flex rounded-lg border p-3 hover:shadow-md">
                      <img
                        src={getCourseBySlug('python-data-science-machine-learning')?.thumbnail}
                        alt={getCourseBySlug('python-data-science-machine-learning')?.title}
                        className="h-16 w-28 rounded object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium line-clamp-2">
                          {getCourseBySlug('python-data-science-machine-learning')?.title}
                        </h4>
                        <div className="mt-1 flex items-center">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-xs text-gray-600">
                            {getCourseBySlug('python-data-science-machine-learning')?.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium">
                          {formatPrice(getCourseBySlug('python-data-science-machine-learning')?.discountPrice || 0)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}