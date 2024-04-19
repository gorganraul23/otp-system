namespace OTP.DTOs{
    public class OtpGenerateDto
    {
        public required string Email { get; set; }
        public required string ExpiryTime { get; set; }
    }
}