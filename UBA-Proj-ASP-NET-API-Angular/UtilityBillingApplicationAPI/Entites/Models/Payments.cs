
namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class Payments
    {
        public int PaymentsId { get; set; }
        public string UserId { get; set; }
        public int BillingId { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }

        public virtual BillingHistory Billing { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
