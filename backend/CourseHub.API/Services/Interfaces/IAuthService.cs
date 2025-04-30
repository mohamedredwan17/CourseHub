using CourseHub.API.Models;
using System.Security.Claims;

namespace CourseHub.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(string email, string password, string firstName, string lastName);
        Task<(User user, string token)> LoginAsync(string email, string password);
        Task<User> UpdateUserAsync(string userId, string firstName, string lastName, string? phoneNumber);
        Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
        Task<bool> ResetPasswordAsync(string email);
        Task<bool> VerifyResetPasswordTokenAsync(string email, string token, string newPassword);
        Task<string> GenerateEmailConfirmationTokenAsync(string userId);
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<string> GeneratePasswordResetTokenAsync(string email);
        ClaimsPrincipal? ValidateToken(string token);
        Task<bool> IsEmailConfirmedAsync(string userId);
        Task<bool> IsUserLockedOutAsync(string userId);
        Task<bool> UnlockUserAsync(string userId);
    }
} 