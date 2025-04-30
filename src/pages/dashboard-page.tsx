import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Award, Calendar, BookOpen } from 'lucide-react';
import { mockUsers, getEnrollmentsForUser } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'wishlist' | 'certificates'>('courses');
  
  // Simulate logged in user
  const currentUser = mockUsers[2]; // Kareem Mahmoud (student)
  const enrollments = getEnrollmentsForUser(currentUser.id);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Learning Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and continue learning
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{currentUser.name}</h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Courses Enrolled</span>
                  <span className="font-medium">{enrollments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Courses</span>
                  <span className="font-medium">
                    {enrollments.filter(e => e.progress === 100).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificates Earned</span>
                  <span className="font-medium">
                    {enrollments.filter(e => e.progress === 100).length}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6 flex border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'courses'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('courses')}
              >
                My Courses
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'wishlist'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                Wishlist
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'certificates'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('certificates')}
              >
                Certificates
              </button>
            </div>

            {/* My Courses Tab Content */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-40 sm:h-auto sm:w-1/3">
                          <img
                            src={enrollment.course.thumbnail}
                            alt={enrollment.course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <h3 className="font-bold">
                              <Link
                                to={`/course/${enrollment.course.slug}`}
                                className="hover:text-blue-600"
                              >
                                {enrollment.course.title}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {enrollment.course.instructor.name}
                            </p>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress: {enrollment.progress}%</span>
                              <span className="flex items-center text-gray-600">
                                <Clock className="mr-1 h-4 w-4" />
                                {enrollment.course.duration} total
                              </span>
                            </div>
                            <Progress value={enrollment.progress} className="mt-2" />
                          </div>

                          <div className="mt-4 flex items-center">
                            <Link to={`/course/${enrollment.course.slug}`}>
                              <Button
                                size="sm"
                                className="flex items-center"
                              >
                                <Play className="mr-1 h-4 w-4" />
                                Continue Learning
                              </Button>
                            </Link>
                            <div className="ml-auto flex items-center text-sm text-gray-600">
                              <Calendar className="mr-1 h-4 w-4" />
                              Enrolled on: {enrollment.enrollmentDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No courses yet
                    </h3>
                    <p className="mt-1 text-gray-600">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Link to="/courses" className="mt-4">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab Content */}
            {activeTab === 'wishlist' && (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
                <BookOpen className="h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Your wishlist is empty
                </h3>
                <p className="mt-1 text-gray-600">
                  Save courses you're interested in by adding them to your wishlist.
                </p>
                <Link to="/courses" className="mt-4">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            )}

            {/* Certificates Tab Content */}
            {activeTab === 'certificates' && (
              <div>
                {enrollments.filter(e => e.progress === 100).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {enrollments
                      .filter(e => e.progress === 100)
                      .map(enrollment => (
                        <div
                          key={enrollment.id}
                          className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="flex items-center">
                            <Award className="h-10 w-10 text-blue-600" />
                            <div className="ml-3">
                              <h3 className="font-medium">
                                {enrollment.course.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Completed on {new Date().toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              Download Certificate
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
                    <Award className="h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No certificates yet
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Complete courses to earn certificates and showcase your skills.
                    </p>
                    <Link to="/courses" className="mt-4">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}