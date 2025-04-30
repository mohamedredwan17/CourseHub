import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: '10 Tips for Learning Programming Faster',
    excerpt: 'Discover effective strategies to accelerate your programming learning journey...',
    author: 'Ahmed Hassan',
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg',
    category: 'Learning Tips',
  },
  {
    id: 2,
    title: 'The Future of Online Education',
    excerpt: 'Explore how technology is shaping the future of online learning...',
    author: 'Layla Ibrahim',
    date: '2024-03-10',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/4149201/pexels-photo-4149201.jpeg',
    category: 'Industry Trends',
  },
  {
    id: 3,
    title: 'How to Stay Motivated While Learning Online',
    excerpt: 'Practical tips to maintain motivation during your online learning journey...',
    author: 'Kareem Mahmoud',
    date: '2024-03-05',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/4149200/pexels-photo-4149200.jpeg',
    category: 'Learning Tips',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Latest insights, tips, and trends in online education
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-blue-600">{blogPosts[0].category}</span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {blogPosts[0].date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {blogPosts[0].readTime}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{blogPosts[0].title}</h2>
            <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
              </div>
              <Button variant="outline">Read More</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-blue-600">{post.category}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{post.author}</span>
                </div>
                <Button variant="outline">Read More</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get the latest updates and insights delivered to your inbox
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
} 