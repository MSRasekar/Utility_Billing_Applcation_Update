
namespace UtilityBillingApplicationMVC.Models;

public partial class Users
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Gender { get; set; }

    public DateTime Dob { get; set; }

    public string MaritalStatus { get; set; }

    public virtual ICollection<Addresses> Addresses { get; set; } = new List<Addresses>();

    public virtual ICollection<ApplicationStatuses> ApplicationStatuses { get; set; } = new List<ApplicationStatuses>();

    public virtual ICollection<BillHistories> BillHistories { get; set; } = new List<BillHistories>();

    public virtual ICollection<MeterInfos> MeterInfos { get; set; } = new List<MeterInfos>();

    public virtual ICollection<Payments> Payments { get; set; } = new List<Payments>();

    public virtual ICollection<Tickets> Tickets { get; set; } = new List<Tickets>();

    public virtual UsersRoles UsersRoles { get; set; }
}