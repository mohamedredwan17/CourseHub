import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  EyeIcon,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Star,
  FilePlus,
  AlertCircle
} from 'lucide-react';
import { mockUsers, mockCourses } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatPrice } from '../lib/utils';
import { Progress } from '../components/ui/progress';

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'analytics' | 'reviews' | 'students'>('courses');
  
  // Simulate logged in instructor
  const currentInstructor = mockUsers[0]; // Ahmed Hassan (instructor)
  
  // Get courses for this instructor
  const instructorCourses = mockCourses.filter(
    course => course.instructor.id === currentInstructor.id
  );
  
  // Calculate some statistics
  const totalStudents = instructorCourses.reduce(
    (sum, course) => sum + course.studentsCount, 0
  );
  
  const totalRevenue = instructorCourses.reduce(
    (sum, course) => sum + (course.discountPrice || course.price) * course.studentsCount, 0
  );
  
  const averageRating = instructorCourses.reduce(
    (sum, course) => sum + course.rating, 0
  ) / instructorCourses.length;

  const courseStatuses = ['All', 'Published', 'Draft'];
  const [statusFilter, setStatusFilter] = useState('All');

  // Mock analytics data
  const monthlyData = [
    { month: 'Jan', enrollments: 45, revenue: 2250 },
    { month: 'Feb', enrollments: 52, revenue: 2600 },
    { month: 'Mar', enrollments: 78, revenue: 3900 },
    { month: 'Apr', enrollments: 110, revenue: 5500 },
    { month: 'May', enrollments: 145, revenue: 7250 },
    { month: 'Jun', enrollments: 180, revenue: 9000 }
  ];

  // Mock reviews data
  const recentReviews = [
    {
      id: '1',
      course: 'Complete Web Development Bootcamp',
      student: 'Sarah Ahmad',
      rating: 5,
      comment: 'This course exceeded my expectations! The instructor explains complex concepts in a very clear way.',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      course: 'Advanced React and Redux',
      student: 'Kareem Mahmoud',
      rating: 4,
      comment: 'Great advanced course on React. Learned a lot about Redux and state management.',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      course: 'Complete Web Development Bootcamp',
      student: 'Omar Hasan',
      rating: 5,
      comment: 'Amazing bootcamp! I was able to land a job after completing this course.',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  // Determine which courses to show based on status filter
  const filteredCourses = instructorCourses.filter(course => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Published') return !course.isBestseller && !course.isNew; // Just for demo
    if (statusFilter === 'Draft') return course.isBestseller || course.isNew; // Just for demo
    return true;
  });

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="mt-1 text-gray-600">
              Manage your courses and monitor performance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/upload-course">
            <Button className="flex items-center">
              <Plus className="mr-1 h-4 w-4" />
              Create New Course
            </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white">
            <CardContent className="flex items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{instructorCourses.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="flex items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="flex items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="flex items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Star className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

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
            Courses
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'analytics'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'students'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>

        {/* Main Content */}
        <div>
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                <div className="flex space-x-2">
                  {courseStatuses.map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    defaultValue="newest"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <div
                      key={course.id}
                      className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-48 sm:h-auto sm:w-1/4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold">
                                <Link
                                  to={`/course/${course.slug}`}
                                  className="hover:text-blue-600"
                                >
                                  {course.title}
                                </Link>
                              </h3>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="flex items-center"
                                >
                                  <EyeIcon className="mr-1 h-4 w-4" />
                                  <span className="hidden sm:inline">Preview</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="flex items-center"
                                >
                                  <Edit className="mr-1 h-4 w-4" />
                                  <span className="hidden sm:inline">Edit</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="flex items-center text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="mr-1 h-4 w-4" />
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {course.shortDescription}
                            </p>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                              <p className="text-xs text-gray-500">STUDENTS</p>
                              <p className="font-semibold">{course.studentsCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">RATING</p>
                              <div className="flex items-center">
                                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                                <Star className="ml-1 h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="ml-1 text-xs text-gray-500">({course.ratingCount})</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">PRICE</p>
                              <p className="font-semibold">
                                {formatPrice(course.discountPrice || course.price)}
                                {course.discountPrice && (
                                  <span className="ml-1 text-xs text-gray-500 line-through">
                                    {formatPrice(course.price)}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">REVENUE</p>
                              <p className="font-semibold">
                                {formatPrice((course.discountPrice || course.price) * course.studentsCount)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge
                                variant={course.isBestseller ? 'warning' : course.isNew ? 'success' : 'default'}
                              >
                                {course.isBestseller ? 'Bestseller' : course.isNew ? 'New' : 'Published'}
                              </Badge>
                              <span className="ml-2 text-xs text-gray-500">
                                Last updated: {course.updatedAt}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{course.duration}</span>
                              <span className="mx-1">•</span>
                              <span>{course.lessons} lessons</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
                    <FilePlus className="h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No courses found
                    </h3>
                    <p className="mt-1 text-gray-600">
                      You don't have any {statusFilter.toLowerCase()} courses yet.
                    </p>
                    <Button className="mt-4 flex items-center">
                      <Plus className="mr-1 h-4 w-4" />
                      Create New Course
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Enrollment & Revenue Trends</h3>
                  <p className="text-sm text-gray-600">Last 6 months</p>
                  
                  <div className="mt-6 h-80">
                    <div className="flex h-64 items-end">
                      {monthlyData.map((data, index) => (
                        <div
                          key={index}
                          className="group relative mx-2 flex w-full flex-col items-center"
                        >
                          <div className="absolute -top-8 hidden rounded bg-gray-800 p-1 text-xs text-white group-hover:block">
                            {formatPrice(data.revenue)}
                          </div>
                          <div 
                            className="w-full rounded-t bg-blue-500" 
                            style={{ height: `${(data.enrollments / 180) * 100}%` }}
                          ></div>
                          <div className="mt-2 text-xs">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Course Performance</h3>
                    <p className="text-sm text-gray-600">Enrollments by course</p>
                    
                    <div className="mt-4 space-y-4">
                      {instructorCourses.map(course => (
                        <div key={course.id}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium line-clamp-1">{course.title}</span>
                            <span className="text-sm">{course.studentsCount} students</span>
                          </div>
                          <Progress 
                            value={(course.studentsCount / totalStudents) * 100} 
                            className="mt-1" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Student Demographics</h3>
                    <p className="text-sm text-gray-600">Where your students are from</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">United States</span>
                        <span className="text-sm">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">India</span>
                        <span className="text-sm">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">United Kingdom</span>
                        <span className="text-sm">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Germany</span>
                        <span className="text-sm">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Brazil</span>
                        <span className="text-sm">8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Other</span>
                        <span className="text-sm">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Completion Rates</h3>
                  <p className="text-sm text-gray-600">Percentage of students who complete each course</p>
                  
                  <div className="mt-4 space-y-4">
                    {instructorCourses.map(course => {
                      // Generate random completion rate for demo
                      const completionRate = Math.floor(Math.random() * (95 - 60) + 60);
                      return (
                        <div key={course.id}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium line-clamp-1">{course.title}</span>
                            <span className="text-sm">{completionRate}% completion</span>
                          </div>
                          <Progress 
                            value={completionRate} 
                            className="mt-1" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col rounded-lg bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Course Ratings</h3>
                  <p className="text-sm text-gray-600">
                    Overall rating: {averageRating.toFixed(1)} out of 5
                  </p>
                </div>
                
                <div className="mt-4 grid grid-cols-5 gap-2 sm:mt-0">
                  {[5, 4, 3, 2, 1].map(rating => {
                    // Generate random percentage for demo
                    const percentage = rating === 5 ? 67 : 
                                      rating === 4 ? 20 : 
                                      rating === 3 ? 8 : 
                                      rating === 2 ? 3 : 2;
                    return (
                      <div key={rating} className="flex items-center">
                        <span className="mr-1 text-sm">{rating}</span>
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <div className="mx-2 h-2 w-full rounded-full bg-gray-200">
                          <div 
                            className="h-2 rounded-full bg-amber-400" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                  <h3 className="text-lg font-semibold">Recent Reviews</h3>
                </div>
                
                <div className="divide-y">
                  {recentReviews.map(review => (
                    <div key={review.id} className="p-6">
                      <div className="flex items-start">
                        <img 
                          src={review.avatar} 
                          alt={review.student} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{review.student}</h4>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          
                          <p className="mt-1 text-sm text-gray-600">{review.course}</p>
                          
                          <div className="mt-1 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          
                          <p className="mt-2 text-gray-700">{review.comment}</p>
                          
                          <div className="mt-3">
                            <Button 
                              size="sm" 
                              variant="outline"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t p-4 text-center">
                  <Button variant="link">View All Reviews</Button>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Student Engagement</h3>
                      <p className="text-sm text-gray-600">
                        Monitor how students interact with your courses
                      </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <select
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                        defaultValue="all-courses"
                      >
                        <option value="all-courses">All Courses</option>
                        {instructorCourses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-white p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">84%</div>
                      <p className="text-sm font-medium text-gray-600">Average Completion</p>
                    </div>
                    
                    <div className="rounded-lg border bg-white p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">65%</div>
                      <p className="text-sm font-medium text-gray-600">Q&A Participation</p>
                    </div>
                    
                    <div className="rounded-lg border bg-white p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">76%</div>
                      <p className="text-sm font-medium text-gray-600">Quiz Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Student Activity</h3>
                    <p className="text-sm text-gray-600">Recent student interactions</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">
                            <span className="font-medium">Ahmed Khalid</span> enrolled in
                            <span className="font-medium"> Complete Web Development Bootcamp</span>
                          </p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Star className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">
                            <span className="font-medium">Layla Ibrahim</span> left a 5-star rating on
                            <span className="font-medium"> Advanced React and Redux</span>
                          </p>
                          <p className="text-xs text-gray-500">3 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">
                            <span className="font-medium">Omar Hasan</span> asked a question in
                            <span className="font-medium"> Complete Web Development Bootcamp</span>
                          </p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">
                            <span className="font-medium">Nour Mahmoud</span> completed
                            <span className="font-medium"> Advanced React and Redux</span>
                          </p>
                          <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Student Feedback</h3>
                    <p className="text-sm text-gray-600">Areas for improvement based on feedback</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <h4 className="ml-2 font-medium">Video Quality</h4>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Some students reported issues with audio quality in section 3.
                        </p>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <h4 className="ml-2 font-medium">Content Difficulty</h4>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          15% of students find the React section too advanced. Consider adding more basic examples.
                        </p>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <h4 className="ml-2 font-medium">Quiz Difficulty</h4>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Quiz in module 5 has a low pass rate. Consider reviewing the questions.
                        </p>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}