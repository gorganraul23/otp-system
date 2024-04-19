using OTP.Data;
using OTP.Models;

namespace OTP.Services{

    public class UserService(ApplicationDbContext context)
    {
        private readonly ApplicationDbContext _context = context;

        public User LoginUser(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
            return user!;
        }
    }

}