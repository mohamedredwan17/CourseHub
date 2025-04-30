import React from 'react';
import HeroSection from '../components/home/hero-section';
import CategoriesSection from '../components/home/categories-section';
import FeaturesSection from '../components/home/features-section';
import TestimonialsSection from '../components/home/testimonials-section';
import CTASection from '../components/home/cta-section';
import CourseGrid from '../components/courses/course-grid';
import { getPopularCategories, getFeaturedCourses } from '../data/mock-data';

export default function HomePage() {
  const popularCategories = getPopularCategories();
  const featuredCourses = getFeaturedCourses();

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CourseGrid 
          courses={featuredCourses} 
          title="Featured Courses" 
          subtitle="Explore our most popular and highly-rated courses" 
        />
      </div>
      <CategoriesSection categories={popularCategories} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}