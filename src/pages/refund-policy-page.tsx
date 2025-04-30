import React from 'react';
import { CreditCard } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <CreditCard className="h-16 w-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4">سياسة الاسترداد</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          نقدم سياسة استرداد شفافة وعادلة لضمان رضا عملائنا
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            نهدف في كورس هب إلى تقديم تجربة تعليمية استثنائية. إذا لم تكن راضياً عن خدمتنا، 
            فإننا نقدم سياسة استرداد واضحة وعادلة.
          </p>
        </section>

        {/* General Policy */}
        <section>
          <h2 className="text-2xl font-bold mb-4">السياسة العامة</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              يمكنك طلب استرداد المبلغ المدفوع في الحالات التالية:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>إذا لم تبدأ الدورة بعد</li>
              <li>إذا لم تكن راضياً عن جودة المحتوى</li>
              <li>إذا واجهت مشاكل تقنية مستمرة</li>
              <li>إذا تم إلغاء الدورة من قبلنا</li>
            </ul>
          </div>
        </section>

        {/* Refund Process */}
        <section>
          <h2 className="text-2xl font-bold mb-4">عملية الاسترداد</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              لطلب استرداد المبلغ:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>قم بتسجيل الدخول إلى حسابك</li>
              <li>اذهب إلى قسم "الدورات المشتراة"</li>
              <li>اختر الدورة التي تريد استرداد قيمتها</li>
              <li>انقر على زر "طلب استرداد"</li>
              <li>أدخل سبب طلب الاسترداد</li>
              <li>انتظر الموافقة على طلبك</li>
            </ol>
          </div>
        </section>

        {/* Time Frame */}
        <section>
          <h2 className="text-2xl font-bold mb-4">الفترة الزمنية</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              فيما يتعلق بفترة الاسترداد:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>يمكن طلب الاسترداد خلال 14 يوماً من تاريخ الشراء</li>
              <li>يتم معالجة طلب الاسترداد خلال 5-7 أيام عمل</li>
              <li>يتم إرجاع المبلغ إلى نفس طريقة الدفع المستخدمة</li>
            </ul>
          </div>
        </section>

        {/* Non-Refundable Cases */}
        <section>
          <h2 className="text-2xl font-bold mb-4">حالات عدم الاسترداد</h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              لا يمكن استرداد المبلغ في الحالات التالية:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>إذا تم إكمال أكثر من 30% من الدورة</li>
              <li>إذا تم الحصول على شهادة إتمام الدورة</li>
              <li>إذا تم تنزيل المواد التعليمية</li>
              <li>إذا تم استخدام كوبونات الخصم</li>
            </ul>
          </div>
        </section>

        {/* Partial Refunds */}
        <section>
          <h2 className="text-2xl font-bold mb-4">الاسترداد الجزئي</h2>
          <p className="text-gray-600 leading-relaxed">
            في بعض الحالات، قد نقدم استرداداً جزئياً بناءً على:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>نسبة إكمال الدورة</li>
            <li>جودة المحتوى المقدم</li>
            <li>المشاكل التقنية التي واجهتها</li>
            <li>ظروف خاصة (يتم تقييمها بشكل فردي)</li>
          </ul>
        </section>

        {/* Technical Issues */}
        <section>
          <h2 className="text-2xl font-bold mb-4">المشاكل التقنية</h2>
          <p className="text-gray-600 leading-relaxed">
            إذا واجهت مشاكل تقنية تمنعك من الوصول إلى المحتوى:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>اتصل بفريق الدعم الفني أولاً</li>
            <li>قدم تفاصيل المشكلة التي تواجهها</li>
            <li>انتظر محاولة حل المشكلة</li>
            <li>إذا استمرت المشكلة، يمكنك طلب الاسترداد</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
          <p className="text-gray-600 leading-relaxed">
            إذا كانت لديك أي أسئلة حول سياسة الاسترداد، يرجى الاتصال بنا على:
            <br />
            البريد الإلكتروني: support@coursehub.com
            <br />
            هاتف: +966 12 345 6789
          </p>
        </section>
      </div>
    </div>
  );
} 