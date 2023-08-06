using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using UtilityBillingApplicationMVC.DTOs;
using UtilityBillingApplicationMVC.Models;
#nullable disable

namespace UtilityBillingApplicationMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public static bool isLoggedIn;
        public static string userRole;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            isLoggedIn = false;
            userRole = "customer";
        }

        public IActionResult Index()
        {
            // Retrieve data related to the user, like IsLoggedIn and UserRole
            bool isLoggedIn = GetIsUserLoggedIn(); // Replace this with your logic to check if the user is logged in
            string userRole = GetUserRole(); // Replace this with your logic to get the user's role

            // Create the ViewModel and populate the properties
            NavbarViewModel navbarViewModel = new NavbarViewModel
            {
                IsLoggedIn = isLoggedIn,
                UserRole = userRole
              
            };

            return View(navbarViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public static string GetUserRole()
        {
            return userRole;
        }

        public static bool GetIsUserLoggedIn()
        {
            return isLoggedIn;
        }
    }
}