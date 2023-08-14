
namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class Meter
    {
        public int MeterId { get; set; }
        
        public string RequiredLoad { get; set; }
        public string ConnectionType { get; set; }

        public int ApplicationStatusId { get; set; }

        // Foreign key to link the order to the user
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public virtual ApplicationStatus ApplicationStatus { get; set; }
        
        public virtual ICollection<BillingHistory> BillingHistory { get; set; }
    }
}
