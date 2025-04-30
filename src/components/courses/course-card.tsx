import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Course } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatPrice, calculateDiscount } from '../../lib/utils';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const discount = calculateDiscount(course.price, course.discountPrice);
  
  return (
    <Link to={`/course/${course.slug}`}>
      <Card className="h-full overflow-hidden hover:border-blue-300 transition-all duration-300">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-40 w-full object-cover"
          />
          {course.isBestseller && (
            <Badge
              variant="warning"
              className="absolute left-2 top-2"
            >
              Bestseller
            </Badge>
          )}
          {course.isNew && (
            <Badge
              variant="success"
              className="absolute left-2 top-2"
            >
              New
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold line-clamp-2 text-lg leading-tight">{course.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{course.shortDescription}</p>
          <div className="mt-2 text-sm text-gray-600">
            <span>{course.instructor.name}</span>
          </div>
          <div className="mt-1 flex items-center">
            <span className="font-bold text-amber-600">{course.rating.toFixed(1)}</span>
            <div className="ml-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(course.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">({course.ratingCount})</span>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            <span>{course.lessons} lessons</span>
            <span className="mx-1">•</span>
            <span>{course.duration}</span>
            <span className="mx-1">•</span>
            <span>{course.level.replace('-', ' ')}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 bg-gray-50">
          <div className="flex items-center">
            {course.discountPrice ? (
              <>
                <span className="font-bold text-lg">{formatPrice(course.discountPrice)}</span>
                <span className="ml-2 line-through text-sm text-gray-500">
                  {formatPrice(course.price)}
                </span>
                {discount && (
                  <Badge className="ml-2" variant="success">
                    {discount}
                  </Badge>
                )}
              </>
            ) : (
              <span className="font-bold text-lg">{formatPrice(course.price)}</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}