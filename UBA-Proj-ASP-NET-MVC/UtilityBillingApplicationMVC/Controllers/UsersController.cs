using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtilityBillingApplicationMVC.Data;
using UtilityBillingApplicationMVC.DTOs;
using UtilityBillingApplicationMVC.Models;


namespace UtilityBillingApplicationMVC.Controllers
{
    public class UsersController : Controller
    {
        private readonly UtilityBillingApplicationDbContext _context;

        private NavbarViewModel _navbarViewModel = new NavbarViewModel();

        public static class CustomClaimTypes
        {
            public const string UserId = "UserId";
        }

        public static int UserId { get; set; }

        public static string role;
        public UsersController(UtilityBillingApplicationDbContext context)
        {
            _context = context;
            _navbarViewModel.UserRole = HomeController.GetUserRole();
            _navbarViewModel.IsLoggedIn = HomeController.GetIsUserLoggedIn();
        }


        [HttpGet]
        public IActionResult Login()
        {
            // Check if TempData contains the success message
            if (TempData.ContainsKey("RegistrationSuccessMessage"))
            {
                ViewBag.SuccessMessage = TempData["RegistrationSuccessMessage"];
            }

            return View(_navbarViewModel);
        }

        [HttpPost]
        public IActionResult Login(NavbarViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Here, you can perform your login logic.
                // For example, check the username and password against the database.
                var user = _context.Users.FirstOrDefault(u => u.Username == model.Login.Username && u.Password == model.Login.Password);

                if (user != null)
                {
                    // Find the user's role based on the user_id from UserRole DbSet.
                    var userRole = _context.UsersRoles.FirstOrDefault(ur => ur.UserId == user.Id);

                    UserId = user.Id;

                    if (userRole != null)
                    {
                        _navbarViewModel.UserRole = userRole.Role;
                        role = userRole.Role;
                        _navbarViewModel.IsLoggedIn = true;
                        if (userRole.Role == "admin")
                        {

                            // Redirect to the admin dashboard.
                            // Redirect to AdminDashboard view for admins
                            return View("~/Views/Admin/AdminDashboard.cshtml", _navbarViewModel);

                        }
                        else if (userRole.Role == "customer")
                        {
                            // Redirect to the customer dashboard.
                            // Replace "CustomerDashboard" with the appropriate controller and action for the customer dashboard.
                            return View("~/Views/Users/UserDashboard.cshtml", _navbarViewModel);
                        }
                    }

                    // If the user role is not found or not matched, show an error message.
                    ModelState.AddModelError("", "Invalid user role. Please contact the administrator.");
                }
                else
                {
                    // Invalid login, show error message.
                    ModelState.AddModelError("", "Invalid username or password. Please try again.");
                }
            }

            // If the model state is not valid or the login failed, return the view with the model data.
            return View(model);
        }

        // GET: Users/SignUp
        [HttpGet]
        public IActionResult SignUp()
        {
            return View(_navbarViewModel);
        }


        // POST: Users/SignUp
        [HttpPost]
        public IActionResult SignUp(NavbarViewModel navbarViewModel)
        {
            if (!ModelState.IsValid)
            {
                // If the model state is not valid, return the view with the model data to show validation errors.
                return View(navbarViewModel);
            }

            Users newUser = new Users
            {
                Username = navbarViewModel.SignUp.Username,
                Password = navbarViewModel.SignUp.Password,
                Email = navbarViewModel.SignUp.Email,
                Dob = navbarViewModel.SignUp.DateOfBirth,
                Gender = navbarViewModel.SignUp.Gender,
                MaritalStatus = navbarViewModel.SignUp.MaritalStatus,
                /* other properties */
            };


            // Add the new User object to dbContext.Users
            _context.Users.Add(newUser);

            // Save changes to the database to generate the UserId
            _context.SaveChanges();

            // Create new ApplicationStatus object with the provided details
            ApplicationStatuses newApplicationStatus = new ApplicationStatuses
            {
                UserId = newUser.Id,
                DateOfRegistration = System.DateTime.Now,
                Status = "pending",
                /* other properties */
            };


            _context.ApplicationStatuses.Add(newApplicationStatus);

            // Save changes to the database to generate Ids for newUser and newApplicationStatus
            _context.SaveChanges();

            // Create new Meter object with the provided details
            MeterInfos newMeter = new MeterInfos
            {
                UserId = newUser.Id,
                ApplicationStatusId = newApplicationStatus.ApplicationStatusId,
                ConnectionType = navbarViewModel.SignUp.ConnectionType,
                RequiredLoad = navbarViewModel.SignUp.RequiredLoad,
                /* other properties */
            };
            // Add the new Meter object to dbContext.Meters
            _context.MeterInfos.Add(newMeter);

            // Save changes again to add the newMeter object with the foreign key references
            _context.SaveChanges();

            UsersRoles userRole = new UsersRoles
            {
                UserId = newUser.Id,
                Role = "customer",
            };
            _context.UsersRoles.Add(userRole);
            _context.SaveChanges();


            // Create a new Address object with the provided details
            Addresses newAddress = new Addresses
            {
                UserId = newUser.Id,
                AddressLine = navbarViewModel.SignUp.PermanentAddress,
                City = navbarViewModel.SignUp.City,
                State = navbarViewModel.SignUp.State,
            };

            // Add the new Address object to the DbContext and save changes to the database
            _context.Addresses.Add(newAddress);
            _context.SaveChanges();

            // Set a success message in TempData
            TempData["RegistrationSuccessMessage"] = "Registration successful! You can now log in.";


            return RedirectToAction("Login");
        }


        [HttpGet]
        public IActionResult Logout()
        {
            // Perform the logout logic here, if any (e.g., clearing session data, etc.).

            _navbarViewModel.UserRole = null;
            _navbarViewModel.IsLoggedIn = false;


            // Redirect the user to the desired page after logout.
            // In this example, let's redirect the user to the home page.
            return RedirectToAction("Index", "Home");
        }


        // GET: Users/Profile
        public async Task<IActionResult> Profile(NavbarViewModel model)
        {
            // Get the currently authenticated user's ID (assuming you're using ASP.NET Core Identity)
            /*  string userId = User.Identity.Name;*/ // Assuming you use the email as the username, otherwise adjust as needed
            int userId = UserId;

            _navbarViewModel.UserRole = role;
            _navbarViewModel.IsLoggedIn = true;

            // Retrieve the user profile data from the database based on the user ID
            Users user = await _context.Users.Include(u => u.Addresses)
                                .FirstOrDefaultAsync(u => u.Id == userId);


            // Handle the case if the user is not found
            if (user == null)
            {
                return NotFound();
            }
            // Save the user into the ViewBag to be used in the view
            ViewBag.UserProfile = user;

            // Pass the user object to the view for rendering the profile information
            return View(_navbarViewModel);
        }


        public async Task<IActionResult> Application(NavbarViewModel model)
        {
            // Get the currently authenticated user's ID (assuming you're using ASP.NET Core Identity)
            int userId = UserId; // Assuming you have a variable named "UserId" with the current user's ID.

            // Retrieve the meter information from the database based on the user ID
            var application = _context.ApplicationStatuses.FirstOrDefault(a => a.UserId == userId);

            // Handle the case if meter information is not found
            if (application == null)
            {
                return NotFound();
            }
            _navbarViewModel.UserRole = role;
            _navbarViewModel.IsLoggedIn = true;
            // Save the meter information into the ViewBag to be used in the view
            ViewBag.Application = application;

            // Pass the meter information to the view for rendering
            return View(_navbarViewModel);
        }

        public async Task<IActionResult> MeterInfo(NavbarViewModel model)
        {
            // Get the currently authenticated user's ID (assuming you're using ASP.NET Core Identity)
            int userId = UserId; // Assuming you have a variable named "UserId" with the current user's ID.

            // Retrieve the meter information from the database based on the user ID
            var meterInfo = await _context.MeterInfos.FirstOrDefaultAsync(m => m.UserId == userId);

            // Handle the case if meter information is not found
            if (meterInfo == null)
            {
                return NotFound();
            }
            _navbarViewModel.UserRole = role;
            _navbarViewModel.IsLoggedIn = true;
            // Save the meter information into the ViewBag to be used in the view
            ViewBag.MeterInfo = meterInfo;

            // Pass the meter information to the view for rendering
            return View(_navbarViewModel);
        }

        // GET: Billing
        [HttpGet]
        public IActionResult BillInfo()
        {
            // Assuming you have a DbSet<BillHistories> in your DbContext named _context
            BillHistories billHistory = _context.BillHistories.Include(b => b.Meter)
                .FirstOrDefault(b => b.UserId == UserId);

            ViewBag.BillHistories = billHistory; // Pass the billing history data to the view using ViewBag
            _navbarViewModel.UserRole = role;
            _navbarViewModel.IsLoggedIn = true;
            return View(_navbarViewModel);
        }


        // POST: Users/PayBill
        [HttpPost]
        public IActionResult PayBill(int billId)
        {
            // Here you can implement the logic to pay the bill based on the billId
            // Assuming you have a service to handle the billing operations
            // Fetch the billing history using the billId from the database
            var billHistory = _context.BillHistories.FirstOrDefault(b => b.BillId == billId);

            // Update the billing status to 'Paid'
            billHistory.Status = "Paid";

            // Save the changes to the database
            _context.SaveChanges();

            return RedirectToAction("BillInfo");

        }

        public async Task<IActionResult> Dashboard(NavbarViewModel model)
        {
            _navbarViewModel.UserRole = role;
            _navbarViewModel.IsLoggedIn = true;

            return View("~/Views/Users/CustomerDashboard.cshtml", _navbarViewModel);
        }
    }
}
