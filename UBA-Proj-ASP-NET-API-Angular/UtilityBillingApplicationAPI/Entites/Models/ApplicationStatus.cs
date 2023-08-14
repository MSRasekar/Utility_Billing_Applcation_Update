
namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class ApplicationStatus
    {
        public ApplicationStatus()
        {
            Meter = new HashSet<Meter>();
        }

        public int ApplicationStatusId { get; set; }
        public string UserId { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public string Status { get; set; }

        public virtual ApplicationUser User { get; set; }

        public virtual ICollection<Meter> Meter { get; set; }
    }
}
