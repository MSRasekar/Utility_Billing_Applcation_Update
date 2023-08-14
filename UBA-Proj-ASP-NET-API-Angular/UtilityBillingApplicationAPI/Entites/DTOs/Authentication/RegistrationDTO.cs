using System.ComponentModel.DataAnnotations;

namespace UtilityBillingApplicationAPI.Entites.DTOs.Authentication
{
    public class RegistrationDTO
    {
        [Required(ErrorMessage = " Username is required")]
        [StringLength(16, MinimumLength = 3, ErrorMessage = "User Name should be between 3 and 16 characters.")]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage = "User Name should not contain any special characters.")]
        public string Username { get; set; }

        [Required(ErrorMessage = " Password is required")]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "Password should be between 6 and 16 characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = " Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = " Gender is required")]
        public string Gender { get; set; }

        [Required(ErrorMessage = " Dob is required")]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        [AgeValidation(ErrorMessage = "Minimum Age: 18 years")]
        public DateTime Dob { get; set; }

        [Required(ErrorMessage = " MaritalStatus is required")]
        public string MaritalStatus { get; set; }

        [Required(ErrorMessage = " Phonenumber is required")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone Number should be 10 digits.")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "Phone Number should contain only numbers.")]
        public string Phonenumber { get; set; }

        [Required(ErrorMessage = " AddressLine is required")]
        [StringLength(100, ErrorMessage = "Address should not exceed 100 characters.")]
        public string AddressLine { get; set; }

        [Required(ErrorMessage = " State is required")]
        [StringLength(50, ErrorMessage = "State should not exceed 50 characters.")]
        public string State { get; set; }

        [Required(ErrorMessage = " City is required")]
        [StringLength(50, ErrorMessage = "City should not exceed 50 characters.")]
        public string City { get; set; }

        [Required(ErrorMessage = " Pincode is required")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "Pincode should be 6 digits.")]
        [RegularExpression("^[0-6]+$", ErrorMessage = "Pincode should contain only numbers.")]
        public string Pincode { get; set; }

        [Required(ErrorMessage = " RequiredLoad is required")]
        public string RequiredLoad { get; set; }

        [Required(ErrorMessage = " ConnectionType is required")]
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
