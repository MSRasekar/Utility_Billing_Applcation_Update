
namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class BillingHistory
    {
        public BillingHistory()
        {
            Payments = new HashSet<Payments>();
        }

        public int BillingHistoryId { get; set; }
        public string UserId { get; set; }
        public int MeterId { get; set; }
        public decimal MeterReading { get; set; }
        public DateTime BillingDate { get; set; }
        public decimal BillingAmount { get; set; }
        public string Status { get; set; }

        public virtual Meter Meter { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual ICollection<Payments> Payments { get; set; }
    }
}
