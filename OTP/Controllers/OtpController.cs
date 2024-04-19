using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OTP.Data;
using OTP.DTOs;
using OTP.Models;

namespace OTP.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class OtpController(ApplicationDbContext context) : Controller{

        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<IActionResult> GenerateOtpAsync([FromBody] OtpGenerateDto otpGenerate)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == otpGenerate.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var otpCodeValue = new Random().Next(100000, 999999).ToString();
            var otpCode = new OtpCode
            {
                Code = otpCodeValue,
                ExpiryDate = DateTime.UtcNow.AddSeconds(Convert.ToInt32(otpGenerate.ExpiryTime)),
                UserId = user.Id
            };

            user.OtpCodes.Add(otpCode);
            await _context.SaveChangesAsync();

            return Ok(otpCodeValue);
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerifyDto otpVerify)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.OtpCodes)
                    .FirstOrDefaultAsync(u => u.Email == otpVerify.Email);

                if (user == null)
                {
                    return NotFound(new { text = "User not found" });
                }

                var otpCode = user.OtpCodes.FirstOrDefault(o => o.Code == otpVerify.OtpCode);

                if (otpCode == null || otpCode.ExpiryDate < DateTime.UtcNow)
                {
                    return NotFound(new { text = "Invalid OTP code or expired" });
                }

                return Ok(new { text = "Valid OTP code" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { text = ex });
            }
        }

    }
}