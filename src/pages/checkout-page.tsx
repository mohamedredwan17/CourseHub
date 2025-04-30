import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Partial<PaymentData>>({});

  const validatePaymentData = (): boolean => {
    const newErrors: Partial<PaymentData> = {};
    let isValid = true;

    // التحقق من رقم البطاقة
    if (!paymentData.cardNumber || !/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid card number';
      isValid = false;
    }

    // التحقق من تاريخ الانتهاء
    if (!paymentData.expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    }

    // التحقق من رمز CVV
    if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const processPayment = async () => {
    // هنا يمكنك إضافة منطق الاتصال بخدمة الدفع
    // هذا مثال فقط
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentData()) {
      return;
    }

    setIsProcessing(true);
    try {
      const success = await processPayment();
      if (success) {
        // إعادة التوجيه إلى صفحة نجاح الدفع
        navigate('/payment-success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      // يمكنك إضافة رسالة خطأ للمستخدم هنا
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Please review your order and enter payment details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* تفاصيل الطلب */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              
              {/* ملخص الدورة */}
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Advanced Programming Course</h3>
                <p className="text-gray-600">Price: $199</p>
              </div>

              {/* معلومات الدفع */}
              <form onSubmit={handleSubmit}>
                <h3 className="font-medium mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="credit"
                      name="payment"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="credit" className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Credit Card
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryDate ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Complete Purchase'}
                  </Button>
                </div>
              </form>
            </div>

            {/* ضمانات الأمان */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Lock className="w-6 h-6 text-green-600" />
                <span className="text-sm text-gray-600">
                  All transactions are encrypted and secure
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm text-gray-600">
                  30-day money-back guarantee
                </span>
              </div>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Price</span>
                  <span>$199</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>$29.85</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$228.85</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>By completing your purchase, you agree to our:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}