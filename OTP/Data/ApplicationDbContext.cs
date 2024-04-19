using Microsoft.EntityFrameworkCore;
using OTP.Models;

namespace OTP.Data {
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {   
        public DbSet<User> Users { get; set; }
        public DbSet<OtpCode> OtpCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OtpCode>()
                .HasOne(o => o.User)
                .WithMany(u => u.OtpCodes)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
