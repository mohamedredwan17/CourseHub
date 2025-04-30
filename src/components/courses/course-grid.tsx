import React from 'react';
import { Course } from '../../types';
import CourseCard from './course-card';

interface CourseGridProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export default function CourseGrid({ courses, title, subtitle }: CourseGridProps) {
  return (
    <div className="py-8">
      {title && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}