using Microsoft.AspNetCore.Mvc;

namespace UtilityBillingApplicationMVC.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
