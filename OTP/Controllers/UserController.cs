using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OTP.Data;
using OTP.DTOs;
using OTP.Models;
using OTP.Services;

namespace OTP.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ApplicationDbContext context, UserService userService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly UserService _userService = userService;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public ActionResult<string> CreateUser(UserLoginDto user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Email and password are required");
            }
            _context.Users.Add(new User {Email = user.Email, Password = user.Password, OtpCodes = []});
            _context.SaveChanges();
            return Ok(user.Email);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Email and password are required");
            }

            var user = _userService.LoginUser(loginDto.Email, loginDto.Password);

            if (user == null)
            {
                return NotFound("Invalid email or password");
            }

            return Ok(new UserDto { Email = user.Email });
        }

    }

}