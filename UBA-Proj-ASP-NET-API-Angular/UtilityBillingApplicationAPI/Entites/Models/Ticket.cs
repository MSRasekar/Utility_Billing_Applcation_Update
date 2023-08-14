

namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public string UserId { get; set; }
        public DateTime TicketDate { get; set; }
        public string TicketDescription { get; set; }
        public string Status { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
