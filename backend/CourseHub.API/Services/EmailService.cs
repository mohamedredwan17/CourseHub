using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using CourseHub.API.Services.Interfaces;

namespace CourseHub.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly string _baseUrl;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpServer = _configuration["Email:SmtpServer"];
            _smtpPort = int.Parse(_configuration["Email:SmtpPort"]);
            _smtpUsername = _configuration["Email:SmtpUsername"];
            _smtpPassword = _configuration["Email:SmtpPassword"];
            _fromEmail = _configuration["Email:FromEmail"];
            _fromName = _configuration["Email:FromName"];
            _baseUrl = _configuration["BaseUrl"] ?? "https://coursehub.com";
        }

        public async Task SendEmailConfirmationAsync(string email, string confirmationToken)
        {
            var confirmationLink = $"{_baseUrl}/confirm-email?token={confirmationToken}";
            var subject = "تأكيد البريد الإلكتروني - CourseHub";
            var body = $@"
                <h2>مرحباً بك في CourseHub!</h2>
                <p>شكراً لتسجيلك في منصتنا. يرجى النقر على الرابط التالي لتأكيد بريدك الإلكتروني:</p>
                <p><a href='{confirmationLink}'>تأكيد البريد الإلكتروني</a></p>
                <p>إذا لم تقم بالتسجيل في CourseHub، يرجى تجاهل هذا البريد.</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendPasswordResetAsync(string email, string resetToken)
        {
            var resetLink = $"{_baseUrl}/reset-password?token={resetToken}";
            var subject = "إعادة تعيين كلمة المرور - CourseHub";
            var body = $@"
                <h2>إعادة تعيين كلمة المرور</h2>
                <p>لقد طلبت إعادة تعيين كلمة المرور لحسابك. يرجى النقر على الرابط التالي لإعادة تعيين كلمة المرور:</p>
                <p><a href='{resetLink}'>إعادة تعيين كلمة المرور</a></p>
                <p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد.</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendWelcomeEmailAsync(string email, string firstName)
        {
            var subject = "مرحباً بك في CourseHub!";
            var body = $@"
                <h2>مرحباً {firstName}!</h2>
                <p>نرحب بك في منصة CourseHub. نحن سعداء بانضمامك إلينا.</p>
                <p>يمكنك الآن استكشاف دوراتنا والبدء في رحلة التعلم.</p>
                <p>إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا.</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendCourseEnrollmentConfirmationAsync(string email, string courseTitle)
        {
            var subject = "تأكيد التسجيل في الدورة - CourseHub";
            var body = $@"
                <h2>تم تسجيلك في الدورة بنجاح!</h2>
                <p>نود إعلامك بأنه تم تسجيلك في الدورة: {courseTitle}</p>
                <p>يمكنك الآن الوصول إلى محتوى الدورة والبدء في التعلم.</p>
                <p>نتمنى لك رحلة تعلم ممتعة!</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendCertificateIssuedAsync(string email, string courseTitle, string certificateNumber)
        {
            var subject = "تم إصدار شهادتك - CourseHub";
            var body = $@"
                <h2>تهانينا!</h2>
                <p>نود إعلامك بأنه تم إصدار شهادتك في الدورة: {courseTitle}</p>
                <p>رقم الشهادة: {certificateNumber}</p>
                <p>يمكنك الوصول إلى شهادتك من خلال حسابك في المنصة.</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendPaymentConfirmationAsync(string email, string amount, string courseTitle)
        {
            var subject = "تأكيد الدفع - CourseHub";
            var body = $@"
                <h2>تم استلام دفعتك بنجاح!</h2>
                <p>نود إعلامك بأنه تم استلام دفعتك بقيمة {amount} للدورة: {courseTitle}</p>
                <p>شكراً لثقتك بنا!</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendSubscriptionRenewalReminderAsync(string email, string planName, DateTime expiryDate)
        {
            var subject = "تذكير بتجديد الاشتراك - CourseHub";
            var body = $@"
                <h2>تذكير بتجديد الاشتراك</h2>
                <p>نود إعلامك بأن اشتراكك في الخطة {planName} سينتهي في {expiryDate:dd/MM/yyyy}</p>
                <p>يرجى تجديد اشتراكك للاستمرار في الاستفادة من خدماتنا.</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendGeneralNotificationAsync(string email, string subject, string message)
        {
            var body = $@"
                <h2>{subject}</h2>
                <p>{message}</p>
            ";

            await SendEmailAsync(email, subject, body);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            using var client = new SmtpClient(_smtpServer, _smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
            };

            using var message = new MailMessage
            {
                From = new MailAddress(_fromEmail, _fromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            message.To.Add(toEmail);

            try
            {
                await client.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                // يمكن إضافة تسجيل الخطأ هنا
                throw new Exception("فشل في إرسال البريد الإلكتروني", ex);
            }
        }
    }
} 