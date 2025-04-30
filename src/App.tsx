import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import HomePage from './pages/home-page';
import CoursesPage from './pages/courses-page';
import CourseDetailPage from './pages/course-detail-page';
import NotFoundPage from './pages/not-found-page';
import DashboardPage from './pages/dashboard-page';
import InstructorDashboardPage from './pages/instructor-dashboard-page';
import ProfilePage from './pages/profile-page';
import AuthPage from './pages/auth-page';
import CartPage from './pages/cart-page';
import TeachPage from './pages/teach-page';
import CategoriesPage from './pages/categories-page';
import UploadCoursePage from './pages/upload-course-page';
import CategoryPage from './pages/category-page';
import BlogPage from './pages/blog-page';
import AboutPage from './pages/about-page';
import ContactPage from './pages/contact-page';
import PrivacyPolicyPage from './pages/privacy-policy-page';
import TermsOfServicePage from './pages/terms-of-service-page';
import RefundPolicyPage from './pages/refund-policy-page';
import CheckoutPage from './pages/checkout-page';
import PaymentSuccessPage from './pages/payment-success-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="course/:slug" element={<CourseDetailPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="instructor" element={<InstructorDashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="teach" element={<TeachPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="upload-course" element={<UploadCoursePage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;