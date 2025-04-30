import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. You can now access the course content in your dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            to="/dashboard" 
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            to="/courses" 
            className="block w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            Explore More Courses
          </Link>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <ul className="text-right space-y-2 text-gray-600">
            <li>✓ You will receive a confirmation email</li>
            <li>✓ You can access the course immediately</li>
            <li>✓ You can start learning now</li>
            <li>✓ You can contact the instructor if needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 