import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { mockCourses, mockCategories } from '../data/mock-data';
import CourseCard from '../components/courses/course-card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { CourseLevel } from '../types';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = mockCourses.filter((course) => {
    // Filter by search term
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = !selectedCategory || 
      course.categories.some(cat => cat.id === selectedCategory);
    
    // Filter by level
    const matchesLevel = !selectedLevel || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const levels: CourseLevel[] = ['beginner', 'intermediate', 'advanced', 'all-levels'];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleLevelChange = (level: CourseLevel) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse our collection of courses taught by expert instructors
        </p>
      </div>

      <div className="mb-8">
        <div className="relative mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="md:hidden">
          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters - desktop */}
        <div className={`hidden md:block ${showFilters ? 'block' : ''}`}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <div className="mt-4 space-y-2">
                {mockCategories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Level</h3>
              <div className="mt-4 space-y-2">
                {levels.map((level) => (
                  <div key={level} className="flex items-center">
                    <input
                      id={`level-${level}`}
                      name={`level-${level}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedLevel === level}
                      onChange={() => handleLevelChange(level)}
                    />
                    <label
                      htmlFor={`level-${level}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {level.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {(selectedCategory || selectedLevel || searchTerm) && (
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-6 lg:col-span-3 lg:mt-0">
          {(selectedCategory || selectedLevel || searchTerm) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {mockCategories.find(c => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Level: {selectedLevel.replace('-', ' ')}
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </Badge>
              )}
            </div>
          )}

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-600">No courses match your search criteria.</p>
              <Button className="mt-4" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}