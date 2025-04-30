import React from 'react';
import { useParams } from 'react-router-dom';
import { mockCategories, mockCourses } from '../data/mock-data';
import { CourseCard } from '../components/course-card';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = mockCategories.find((cat) => cat.slug === slug);
  const courses = mockCourses.filter((course) =>
    course.categories.some((cat) => cat.slug === slug)
  );

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">
          {courses.length} courses available in this category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No courses found
          </h2>
          <p className="text-gray-600">
            There are no courses available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
} 