using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CourseHub.API.Data;
using CourseHub.API.Models;
using CourseHub.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CourseHub.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthService(ApplicationDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<User> RegisterAsync(string email, string password, string firstName, string lastName)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email))
                throw new Exception("البريد الإلكتروني مستخدم بالفعل");

            var user = new User
            {
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                PasswordHash = HashPassword(password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // إرسال بريد تأكيد البريد الإلكتروني
            var token = await GenerateEmailConfirmationTokenAsync(user.Id);
            await _emailService.SendEmailConfirmationAsync(user.Email, token);

            return user;
        }

        public async Task<(User user, string token)> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !VerifyPassword(password, user.PasswordHash))
                throw new Exception("البريد الإلكتروني أو كلمة المرور غير صحيحة");

            if (await IsUserLockedOutAsync(user.Id))
                throw new Exception("الحساب مقفل مؤقتاً. يرجى المحاولة لاحقاً");

            if (!await IsEmailConfirmedAsync(user.Id))
                throw new Exception("يرجى تأكيد البريد الإلكتروني أولاً");

            var token = GenerateJwtToken(user);
            return (user, token);
        }

        public async Task<User> UpdateUserAsync(string userId, string firstName, string lastName, string? phoneNumber)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("المستخدم غير موجود");

            user.FirstName = firstName;
            user.LastName = lastName;
            user.PhoneNumber = phoneNumber;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !VerifyPassword(currentPassword, user.PasswordHash))
                return false;

            user.PasswordHash = HashPassword(newPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ResetPasswordAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;

            var token = await GeneratePasswordResetTokenAsync(email);
            await _emailService.SendPasswordResetAsync(email, token);
            return true;
        }

        public async Task<bool> VerifyResetPasswordTokenAsync(string email, string token, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;

            // التحقق من صحة الرمز (يمكن استخدام JWT أو تخزين الرمز في قاعدة البيانات)
            if (!ValidateToken(token))
                return false;

            user.PasswordHash = HashPassword(newPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("المستخدم غير موجود");

            var token = GenerateJwtToken(user, "email_confirmation");
            return token;
        }

        public async Task<bool> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            if (!ValidateToken(token))
                return false;

            user.EmailConfirmed = true;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GeneratePasswordResetTokenAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                throw new Exception("المستخدم غير موجود");

            var token = GenerateJwtToken(user, "password_reset");
            return token;
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> IsEmailConfirmedAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.EmailConfirmed ?? false;
        }

        public async Task<bool> IsUserLockedOutAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.LockoutEnd > DateTime.UtcNow;
        }

        public async Task<bool> UnlockUserAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.LockoutEnd = null;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        private string GenerateJwtToken(User user, string? purpose = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.GivenName, user.FirstName),
                    new Claim(ClaimTypes.Surname, user.LastName),
                    new Claim("purpose", purpose ?? "authentication")
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpiryInMinutes"])),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
} 