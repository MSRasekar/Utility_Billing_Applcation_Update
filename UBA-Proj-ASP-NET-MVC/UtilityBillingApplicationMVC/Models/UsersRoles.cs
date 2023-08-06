
namespace UtilityBillingApplicationMVC.Models;

public partial class UsersRoles
{
    public int UserId { get; set; }

    public string Role { get; set; }

    public virtual Users User { get; set; }
}