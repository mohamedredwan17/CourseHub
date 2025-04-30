import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Users, DollarSign, BarChart } from 'lucide-react';

export default function TeachPage() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: 'Create Your Course',
      description: 'Design and publish your course with our easy-to-use tools.',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Reach Students',
      description: 'Connect with millions of students around the world.',
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: 'Earn Money',
      description: 'Get paid for your expertise and grow your income.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      title: 'Track Progress',
      description: 'Monitor your course performance and student engagement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Teach the World Online
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create an online video course, reach students across the globe, and earn money
            </p>
            <Button size="lg" className="px-8">
              Start Teaching Today
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Plan Your Curriculum</h3>
                  <p className="text-gray-600">
                    Plan your course content and structure. Break down your expertise into
                    digestible lessons.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Record Your Videos</h3>
                  <p className="text-gray-600">
                    Record high-quality video lessons using our recommended tools and
                    guidelines.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Publish Your Course</h3>
                  <p className="text-gray-600">
                    Upload your content, add quizzes and assignments, and publish your
                    course.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
                  <p className="text-gray-600">
                    Start earning money as students enroll in your course. Get paid monthly
                    through our secure payment system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Teaching?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of instructors who are already teaching on CourseHub
          </p>
          <Button size="lg" className="px-8">
            Become an Instructor
          </Button>
        </div>
      </div>
    </div>
  );
} 