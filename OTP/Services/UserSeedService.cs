using OTP.Data;
using OTP.Models;

namespace OTP.Services
{
    public class UserSeedService(ApplicationDbContext context)
    {
        private readonly ApplicationDbContext _context = context;

        public void SeedData()
        {
            // Check if the User table is empty
            if (!_context.Users.Any())
            {
                // Create a new user
                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Email = "test@yahoo.com",
                    Password = "password"
                };

                // Add the user to the database
                _context.Users.Add(user);
                _context.SaveChanges();
            }
        }
    }

}