import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select } from '../components/ui/select';
import { mockCategories } from '../data/mock-data';

export default function UploadCoursePage() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    level: 'all-levels',
    category: '',
    thumbnail: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCourseData((prev) => ({
        ...prev,
        thumbnail: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Course data:', courseData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Course</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Course Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            placeholder="Enter your course title"
            required
          />
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Course Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            placeholder="Describe your course in detail"
            rows={6}
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            value={courseData.shortDescription}
            onChange={handleInputChange}
            placeholder="A brief description of your course"
            rows={3}
            required
          />
        </div>

        {/* Course Price */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Course Price
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            placeholder="Enter course price"
            required
          />
        </div>

        {/* Course Level */}
        <div className="mb-6">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
            Course Level
          </label>
          <Select
            id="level"
            name="level"
            value={courseData.level}
            onChange={handleInputChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all-levels">All Levels</option>
          </Select>
        </div>

        {/* Course Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Course Category
          </label>
          <Select
            id="category"
            name="category"
            value={courseData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {mockCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Course Thumbnail */}
        <div className="mb-6">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Course Thumbnail
          </label>
          <Input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
} 