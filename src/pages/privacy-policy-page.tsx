import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Shield className="h-16 w-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          نحن نحرص على حماية خصوصيتك. تعرف على كيفية جمع واستخدام بياناتك الشخصية
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            نرحب بك في منصة كورس هب. نحن ندرك أهمية خصوصيتك ونلتزم بحماية بياناتك الشخصية. 
            توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام منصتنا.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">المعلومات التي نجمعها</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. المعلومات التي تقدمها لنا</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>معلومات الحساب (الاسم، البريد الإلكتروني، كلمة المرور)</li>
              <li>معلومات الملف الشخصي (الصورة، السيرة الذاتية)</li>
              <li>معلومات الدفع (عند شراء الدورات)</li>
              <li>معلومات الاتصال (عند التواصل معنا)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">2. المعلومات التي نجمعها تلقائياً</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>معلومات الجهاز والمتصفح</li>
              <li>سجلات الوصول والاستخدام</li>
              <li>ملفات تعريف الارتباط (Cookies)</li>
              <li>بيانات الموقع</li>
            </ul>
          </div>
        </section>

        {/* Information Usage */}
        <section>
          <h2 className="text-2xl font-bold mb-4">كيف نستخدم معلوماتك</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              نستخدم معلوماتك الشخصية للأغراض التالية:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>توفير وتشغيل خدمات المنصة</li>
              <li>تحسين تجربة المستخدم</li>
              <li>معالجة المدفوعات والمعاملات</li>
              <li>إرسال التحديثات والإشعارات</li>
              <li>تحليل استخدام المنصة</li>
              <li>توفير الدعم الفني</li>
            </ul>
          </div>
        </section>

        {/* Information Protection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">حماية معلوماتك</h2>
          <p className="text-gray-600 leading-relaxed">
            نستخدم إجراءات أمنية فنية وتنظيمية لحماية معلوماتك الشخصية من الوصول غير المصرح به 
            أو الاستخدام أو الكشف أو التعديل أو التدمير. ومع ذلك، لا يمكننا ضمان أمان المعلومات 
            التي تنقلها عبر الإنترنت.
          </p>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-2xl font-bold mb-4">مشاركة المعلومات</h2>
          <p className="text-gray-600 leading-relaxed">
            نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>مقدمي الخدمات الذين يساعدوننا في تشغيل المنصة</li>
            <li>السلطات القانونية عند الالتزام بالقوانين</li>
            <li>في حالة دمج أو استحواذ الشركة</li>
          </ul>
        </section>

        {/* User Rights */}
        <section>
          <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
          <p className="text-gray-600 leading-relaxed">
            لديك الحق في:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>الوصول إلى معلوماتك الشخصية</li>
            <li>تصحيح معلوماتك غير الدقيقة</li>
            <li>حذف معلوماتك الشخصية</li>
            <li>الاعتراض على معالجة معلوماتك</li>
            <li>سحب موافقتك على معالجة معلوماتك</li>
          </ul>
        </section>

        {/* Policy Updates */}
        <section>
          <h2 className="text-2xl font-bold mb-4">تحديثات السياسة</h2>
          <p className="text-gray-600 leading-relaxed">
            قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية 
            من خلال نشر الإشعار على المنصة أو إرسال بريد إلكتروني إليك.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
          <p className="text-gray-600 leading-relaxed">
            إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يرجى الاتصال بنا على:
            <br />
            البريد الإلكتروني: privacy@coursehub.com
          </p>
        </section>
      </div>
    </div>
  );
} 