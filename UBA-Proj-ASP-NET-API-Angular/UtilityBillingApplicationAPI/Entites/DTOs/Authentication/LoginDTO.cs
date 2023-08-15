using System.ComponentModel.DataAnnotations;

namespace UtilityBillingApplicationAPI.Entites.DTOs.Authentication
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}
