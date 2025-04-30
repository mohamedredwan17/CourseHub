import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <FileText className="h-16 w-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4">شروط الاستخدام</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          يرجى قراءة هذه الشروط بعناية قبل استخدام منصة كورس هب
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            مرحباً بك في منصة كورس هب. من خلال استخدام المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
          </p>
        </section>

        {/* Account Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-4">شروط الحساب</h2>
          <div className="space-y-4">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>يجب أن تكون 18 عاماً أو أكثر لإنشاء حساب</li>
              <li>يجب تقديم معلومات دقيقة وكاملة عند التسجيل</li>
              <li>أنت مسؤول عن الحفاظ على سرية معلومات حسابك</li>
              <li>يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك</li>
            </ul>
          </div>
        </section>

        {/* Content and Conduct */}
        <section>
          <h2 className="text-2xl font-bold mb-4">المحتوى وسلوك المستخدم</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              عند استخدام المنصة، يجب عليك:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>احترام حقوق الملكية الفكرية للآخرين</li>
              <li>عدم نشر محتوى غير قانوني أو مسيء</li>
              <li>عدم استخدام المنصة لأغراض غير مشروعة</li>
              <li>عدم محاولة تعطيل أو إتلاف المنصة</li>
              <li>عدم محاولة الوصول غير المصرح به إلى حسابات الآخرين</li>
            </ul>
          </div>
        </section>

        {/* Course Content */}
        <section>
          <h2 className="text-2xl font-bold mb-4">محتوى الدورات</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              فيما يتعلق بمحتوى الدورات:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>المحتوى مقدم لأغراض تعليمية فقط</li>
              <li>لا نضمن دقة أو اكتمال المحتوى</li>
              <li>يحق لنا تعديل أو إزالة المحتوى في أي وقت</li>
              <li>المحتوى محمي بحقوق الملكية الفكرية</li>
            </ul>
          </div>
        </section>

        {/* Payments and Refunds */}
        <section>
          <h2 className="text-2xl font-bold mb-4">المدفوعات والاسترداد</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              فيما يتعلق بالمدفوعات والاسترداد:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>جميع الأسعار بالريال السعودي</li>
              <li>يجب دفع الرسوم قبل بدء الدورة</li>
              <li>سياسة الاسترداد تنطبق وفقاً للشروط المحددة</li>
              <li>قد نغير الأسعار في أي وقت مع إشعار مسبق</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-4">الملكية الفكرية</h2>
          <p className="text-gray-600 leading-relaxed">
            جميع المحتويات الموجودة على المنصة، بما في ذلك النصوص والرسومات والشعارات والصور 
            والبرمجيات، هي ملك لنا أو لشركائنا ومحمية بموجب قوانين الملكية الفكرية.
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-2xl font-bold mb-4">إنهاء الخدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            نحتفظ بالحق في إنهاء أو تعليق حسابك في أي وقت، مع أو بدون إشعار، إذا اعتبرنا أنك 
            انتهكت هذه الشروط أو قوانين أخرى ذات صلة.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold mb-4">تحديد المسؤولية</h2>
          <p className="text-gray-600 leading-relaxed">
            لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية 
            ناتجة عن استخدام أو عدم القدرة على استخدام المنصة.
          </p>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-4">تغييرات الشروط</h2>
          <p className="text-gray-600 leading-relaxed">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية 
            من خلال المنصة أو عبر البريد الإلكتروني.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
          <p className="text-gray-600 leading-relaxed">
            إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على:
            <br />
            البريد الإلكتروني: legal@coursehub.com
          </p>
        </section>
      </div>
    </div>
  );
} 