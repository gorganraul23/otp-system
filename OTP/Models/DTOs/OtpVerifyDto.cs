namespace OTP.DTOs{
    public class OtpVerifyDto
    {
        public required string Email { get; set; }
        public required string OtpCode { get; set; }
    }
}