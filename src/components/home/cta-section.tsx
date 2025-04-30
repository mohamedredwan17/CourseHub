import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function CTASection() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of students already learning on CourseHub. Discover courses and start learning today.
          </p>
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-blue-700"
            >
              <Link to="/teach">Become an Instructor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}