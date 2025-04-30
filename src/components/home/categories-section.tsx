import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const categoryIcons: { [key: string]: string } = {
    'web-development': '💻',
    'mobile-development': '📱',
    'data-science': '📊',
    'ui-ux-design': '🎨',
    'business': '💼',
    'marketing': '📈',
    'photography': '📷',
    'it-software': '⚙️',
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Explore Top Categories
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Browse courses by category and find the perfect match for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group flex flex-col items-center rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                {categoryIcons[category.slug] || '🔍'}
              </div>
              <h3 className="text-center text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="mt-1 text-center text-sm text-gray-600">
                {category.count} courses
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/categories"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <span className="font-medium">View all categories</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}