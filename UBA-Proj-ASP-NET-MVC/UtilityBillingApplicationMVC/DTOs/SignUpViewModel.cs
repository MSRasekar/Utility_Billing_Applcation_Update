using System.ComponentModel.DataAnnotations;

namespace UtilityBillingApplicationMVC.DTOs
{
    public class SignUpViewModel
    {
        [Required]
        [StringLength(16, MinimumLength = 3, ErrorMessage = "User Name should be between 3 and 16 characters.")]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage = "User Name should not contain any special characters.")]
        public string Username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "Password should be between 6 and 16 characters.")]
        public string Password { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "State should not exceed 50 characters.")]
        public string State { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "City should not exceed 50 characters.")]
        public string City { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        [AgeValidation(ErrorMessage = "Minimum Age: 18 years")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Permanent Address should not exceed 100 characters.")]
        public string PermanentAddress { get; set; }

        [Required]
        public string MaritalStatus { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone Number should be 10 digits.")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "Phone Number should contain only numbers.")]
        public string PhoneNumber { get; set; }

        [Required]
        public string RequiredLoad { get; set; }

        [Required]
        public string ConnectionType { get; set; }
    }

    // Custom validation attribute to validate the minimum age (18 years)
    public class AgeValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime dateOfBirth)
            {
                var today = DateTime.Today;
                var age = today.Year - dateOfBirth.Year;

                if (dateOfBirth > today.AddYears(-age))
                    age--;

                if (age < 18)
                    return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
