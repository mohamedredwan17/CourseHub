import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { formatPrice, calculateDiscount } from '../lib/utils';
import { Badge } from './ui/badge';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course.slug}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.isBestseller && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            Bestseller
          </Badge>
        )}
        {course.isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
            New
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{course.instructor.name}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">
            {course.rating} ({course.ratingCount})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(course.discountPrice || course.price)}
            </span>
            {course.discountPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          {course.discountPrice && (
            <span className="text-sm text-red-500">
              {calculateDiscount(course.price, course.discountPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 