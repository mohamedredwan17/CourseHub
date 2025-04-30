namespace CourseHub.API.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string email, string confirmationToken);
        Task SendPasswordResetAsync(string email, string resetToken);
        Task SendWelcomeEmailAsync(string email, string firstName);
        Task SendCourseEnrollmentConfirmationAsync(string email, string courseTitle);
        Task SendCertificateIssuedAsync(string email, string courseTitle, string certificateNumber);
        Task SendPaymentConfirmationAsync(string email, string amount, string courseTitle);
        Task SendSubscriptionRenewalReminderAsync(string email, string planName, DateTime expiryDate);
        Task SendGeneralNotificationAsync(string email, string subject, string message);
    }
} 