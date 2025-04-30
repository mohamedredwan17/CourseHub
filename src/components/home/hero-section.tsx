import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center"
          style={{ filter: 'blur(2px)' }}
        ></div>
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Learn Without Limits
          </h1>
          <p className="mt-6 text-xl">
            Start, switch, or advance your career with thousands of courses from expert instructors.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full bg-white pl-10 pr-16 text-gray-900"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button
                    type="submit"
                    className="rounded-md px-4 py-2"
                    aria-label="Search"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium">Popular searches: Web Development, Python, Data Science, Marketing</p>
          </div>
        </div>
      </div>
    </div>
  );
}