using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class ApplicationUser : IdentityUser
    {

        [Required(ErrorMessage = " Gender is required")]
        public string Gender { get; set; }
        [Required(ErrorMessage = " Dob is required")]
        public DateTime Dob { get; set; }
        [Required(ErrorMessage = " MaritalStatus is required")]
        public string MaritalStatus { get; set; }

        [Required(ErrorMessage = " AddressLine is required")]
        public string AddressLine { get; set; }
        [Required(ErrorMessage = " City is required")]
        public string City { get; set; }
        [Required(ErrorMessage = " State is required")]
        public string State { get; set; }
        [Required(ErrorMessage = " Pincode is required")]
        public string Pincode { get; set; }




        public virtual ICollection<ApplicationStatus> ApplicationStatus { get; set; }

        public virtual Meter Meter { get; set; }

        public virtual ICollection<Payments> Payments { get; set; }

        public virtual ICollection<BillingHistory> BillingHistory { get; set; }
        public virtual ICollection<Ticket> Ticket { get; set; }


    }
}
