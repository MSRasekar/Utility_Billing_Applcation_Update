namespace UtilityBillingApplicationMVC.DTOs
{
    public class UpdateUserModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime Dob { get; set; }
        public string MaritalStatus { get; set; }
    }
}
