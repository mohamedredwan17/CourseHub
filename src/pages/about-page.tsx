import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Users, BookOpen, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">عن منصة كورس هب</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          منصة تعليمية رائدة تهدف إلى توفير تعليم عالي الجودة للجميع، في أي وقت ومن أي مكان
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">رسالتنا</h2>
          <p className="text-gray-600 mb-6">
            نؤمن بأن التعليم حق للجميع. نسعى جاهدين لتوفير تجربة تعليمية استثنائية من خلال:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>توفير محتوى تعليمي عالي الجودة</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>دعم التعلم المستمر والتطوير المهني</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>بناء مجتمع تعليمي نشط</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg">
          <img
            src="https://images.pexels.com/photos/4149201/pexels-photo-4149201.jpeg"
            alt="Mission"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-3xl font-bold mb-2">10,000+</h3>
          <p className="text-gray-600">طالب</p>
        </div>
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-3xl font-bold mb-2">500+</h3>
          <p className="text-gray-600">دورة تدريبية</p>
        </div>
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-3xl font-bold mb-2">100+</h3>
          <p className="text-gray-600">مدرب معتمد</p>
        </div>
        <div className="text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-3xl font-bold mb-2">98%</h3>
          <p className="text-gray-600">رضا الطلاب</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">فريقنا</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'أحمد محمد',
              role: 'المدير التنفيذي',
              image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            },
            {
              name: 'سارة أحمد',
              role: 'مديرة المحتوى',
              image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
            },
            {
              name: 'محمد علي',
              role: 'مدير التطوير',
              image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">انضم إلينا اليوم</h2>
        <p className="text-gray-600 mb-6">
          ابدأ رحلة التعلم الخاصة بك مع كورس هب
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/courses">
            <Button>استعرض الدورات</Button>
          </Link>
          <Link to="/teach">
            <Button variant="outline">كن مدرباً</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 