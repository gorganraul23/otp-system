namespace OTP.Models
{
    public class OtpCode
    {
        public Guid Id { get; set; }
        public required string Code { get; set; }
        public DateTime ExpiryDate { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;   
    }
}