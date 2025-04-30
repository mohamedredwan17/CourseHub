import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingCart, Bell, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { mockCategories } from '../../data/mock-data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CourseHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/courses"
              className={`text-sm font-medium ${
                location.pathname === '/courses'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Courses
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  {mockCategories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link
                      to="/categories"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View All Categories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/teach"
              className={`text-sm font-medium ${
                location.pathname === '/teach'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Teach on CourseHub
            </Link>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button className="text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <Link to="/cart" className="text-gray-500 hover:text-gray-700">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100"
                >
                  <span className="text-sm font-medium text-blue-700">KM</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogin}
                  className="hidden sm:inline-flex"
                >
                  Log In
                </Button>
                <Link to="/auth">
                <Button size="sm" className="hidden sm:inline-flex">
                  Sign Up
                </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="mb-3">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <Link
              to="/courses"
              className="block py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <button
              className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Categories
            </button>
            <div className="pl-4 space-y-1">
              {mockCategories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="block py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              to="/teach"
              className="block py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Teach on CourseHub
            </Link>
            {!isLoggedIn && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogin}
                    className="flex-1"
                  >
                    Log In
                  </Button>
                  
                  <Link to="/auth">
                  <Button size="sm" className="flex-1">
                    Sign Up
                  </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}