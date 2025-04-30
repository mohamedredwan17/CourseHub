import React from 'react';
import { Clock, Award, BookOpen, Users } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: 'Comprehensive Courses',
      description: 'Access a wide range of courses covering various subjects and skill levels.',
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and experienced instructors from around the world.',
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace, anywhere and anytime that suits your schedule.',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: 'Certification',
      description: 'Earn certificates upon completion to showcase your newly acquired skills.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Choose CourseHub?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We provide the tools and resources you need to expand your knowledge and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}