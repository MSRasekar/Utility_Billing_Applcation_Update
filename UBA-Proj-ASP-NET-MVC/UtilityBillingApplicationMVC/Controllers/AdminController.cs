using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using UtilityBillingApplicationMVC.Data;
using UtilityBillingApplicationMVC.DTOs;
using UtilityBillingApplicationMVC.Models;

namespace UtilityBillingApplicationMVC.Controllers
{
    public class AdminController : Controller
    {
        private readonly UtilityBillingApplicationDbContext _context;

        private NavbarViewModel _navbarViewModel = new NavbarViewModel();
        public AdminController(UtilityBillingApplicationDbContext context)
        {
            _context = context;
            _navbarViewModel.UserRole = HomeController.GetUserRole();
            _navbarViewModel.IsLoggedIn = HomeController.GetIsUserLoggedIn();
        }

        // GET: Admin/Applications
        public IActionResult Applications(NavbarViewModel navbarViewModel)
        {
            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;
            // Retrieve applications data from the database and pass it to the view.
            var applications = _context.ApplicationStatuses.Include(a => a.User).Include(a => a.User.Addresses).Include(a => a.MeterInfos).ToList();
            ViewBag.Applications = applications;
            return View(_navbarViewModel);
        }

        //GET: Admin/UsersList
        [HttpGet]
        public IActionResult UsersList()
        {
            // Retrieve users data from the database and pass it to the view.
            var users = _context.Users.Include(u => u.Addresses).Where(u => u.Id != 14).ToList();

            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;
            // Add the users data to the ViewBag.
            ViewBag.Users = users;
            return View(_navbarViewModel);
        }


        // POST: Admin/Applications
        [HttpPost]
        public IActionResult Applications(int applicationId, string status, NavbarViewModel navbarViewModel)
        {
            // Retrieve the application based on the applicationId from the database
            var application = _context.ApplicationStatuses.Find(applicationId);
            if (application == null)
            {
                // Application not found, return an error or handle as needed.
                return NotFound();
            }

            // Update the status with the new value
            application.Status = status;

            // Save the changes to the database
            _context.SaveChanges();

            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;

            // Redirect back to the Applications page
            return RedirectToAction("Applications", _navbarViewModel);
        }

        // GET: Admin/GenreateBill
        [HttpGet]
        public ActionResult GenerateBill()
        {
            // Replace 'YourModel' with the actual model you have
            //YourModel model = new YourModel
            //{
            //    Users = // Logic to get a list of users from your data source,
            // Initialize other properties here as needed
            //var users = _context.Users.Include(u => u.BillingHistory).Where(u => u.Id != 14).ToList();
            // Assuming dynamicData is a list of User objects retrieved from the database
            var dynamicData = _context.Users.ToList();

            // Get the list of user IDs that already have a bill in the BillingHistory table
            var usersWithBill = _context.BillHistories.Select(b => b.UserId).ToList();

            // Filter out the users who already have a bill
            var usersWithoutBill = dynamicData.Where(user => !usersWithBill.Contains(user.Id) && user.Id != 14).ToList();

            // Pass the filtered list to the view
            ViewBag.Users = usersWithoutBill;


            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;
            // Add the users data to the ViewBag.
            //ViewBag.Users = users;
            return View(_navbarViewModel);
        }


        [HttpPost]
        public IActionResult SubmitBill(int selectedUserId, int billingUnit)
        {
            // Here you can use the selectedUserId and billingUnit to create the bill
            // For example, assuming you have a service to handle the bill generation

            // Calculate the total billing amount based on the billing unit and any other logic you have
            int totalBillingAmount = billingUnit * 8; // Assuming billing rate is 100 per unit, adjust it based on your logic
                                                      // Create a new Bill instance with the necessary data
                                                      // Create a new BillingHistory instance with the necessary data

            MeterInfos meterInfo = _context.MeterInfos.FirstOrDefault(m => m.UserId == selectedUserId);
            BillHistories lastBilling = _context.BillHistories.OrderByDescending(b => b.BillId).FirstOrDefault();
            if (lastBilling == null)
            {
                BillHistories newBill = new BillHistories
                {
                    
                    UserId = selectedUserId,
                    MeterId = meterInfo.MeterId,
                    BillingDate = DateTime.Now, // Set the billing date to the current date and time
                    BillAmount = totalBillingAmount,
                    MeterReading = billingUnit,
                    Status = "Pending" // Assuming the initial status is "Pending", you can adjust this based on your business logic
                                       // Add any other properties you have in the BillingHistory model as needed
                };
                // Save the new bill data to the database
                _context.BillHistories.Add(newBill);
                _context.SaveChanges();
            }
            else
            {


                BillHistories newBill = new BillHistories
                {
                    
                    UserId = selectedUserId,
                    MeterId = meterInfo.MeterId,
                    MeterReading = billingUnit,
                    BillingDate = DateTime.Now, // Set the billing date to the current date and time
                    BillAmount = totalBillingAmount,
                    Status = "Pending" // Assuming the initial status is "Pending", you can adjust this based on your business logic
                                       // Add any other properties you have in the BillingHistory model as needed
                };
                // Save the new bill data to the database
                _context.BillHistories.Add(newBill);
                _context.SaveChanges();
            }



            // You can redirect back to the same page (e.g., Users application page) after bill generation
            return RedirectToAction("GenerateBill");
        }
        public IActionResult EditProfile(int userId)
        {
            // Retrieve the user with the given userId from the database
            var user = _context.Users.Include(u => u.Addresses).FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                // If the user is not found, you can handle the error or redirect to an error page
                // For example, return a view with an error message
                return View("Error");
            }

            // Here you can pass the user object to the view or perform any other necessary actions
            // For example, you can pass the user data to a view and display an edit form
            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;
            // Add the users data to the ViewBag.
            ViewBag.Users = user;
            return View(_navbarViewModel);
        }

        [HttpPost]
        public IActionResult UpdateUser(UpdateUserModel updateUserModel)
        {
            // Find the user based on the UserId
            var user = _context.Users.FirstOrDefault(u => u.Id == updateUserModel.UserId);

            if (user != null)
            {
                // Update the user properties
                user.Username = updateUserModel.Username;
                user.Email = updateUserModel.Email;
                user.Dob = updateUserModel.Dob;
                user.MaritalStatus = updateUserModel.MaritalStatus;

                // Assuming each user has only one address, you can update the address directly
                var address = _context.Addresses.FirstOrDefault(a => a.UserId == updateUserModel.UserId);
                if (address != null)
                {
                    address.AddressLine = updateUserModel.Address;
                    address.City = updateUserModel.City;
                    address.State = updateUserModel.State;
                }
                else
                {
                    // If the address is not found, you can create a new one and associate it with the user
                    address = new Addresses
                    {
                        AddressLine = updateUserModel.Address,
                        City = updateUserModel.City,
                        State = updateUserModel.State,
                        UserId = updateUserModel.UserId
                    };
                    _context.Addresses.Add(address);
                }

                // Save the changes to the database
                _context.SaveChanges();

                // Redirect back to the user list or any other desired action
                return RedirectToAction("UsersList");
            }
            // If the user is not found, you can handle the error accordingly
            return NotFound();


        }

        public IActionResult DeleteProfile(int userId)
        {
            // Find the user based on the userId
            var user = _context.Users.Include(u => u.Addresses).Include(u => u.MeterInfos).Include(u => u.ApplicationStatuses).FirstOrDefault(u => u.Id == userId);

            if (user != null)
            {
                // Remove the related entities (Address, Meter, ApplicationStatus) first
                _context.Addresses.RemoveRange(user.Addresses);
                _context.MeterInfos.RemoveRange(user.MeterInfos);
                _context.ApplicationStatuses.RemoveRange(user.ApplicationStatuses);

                // Remove the user role
                var userRole = _context.UsersRoles.FirstOrDefault(u => u.UserId == userId);
                if (userRole != null)
                {
                    _context.UsersRoles.Remove(userRole);
                }

                // Now remove the user
                _context.Users.Remove(user);

                // Save the changes after removing each entity
                _context.SaveChanges();

                // Redirect back to the user list or any other desired action
                return RedirectToAction("UsersList");
            }

            // If the user is not found, you can handle the error accordingly
            return NotFound();
        }

        [HttpGet]
        public IActionResult AllBillStatuses()
        {
            // Retrieve all bill history records from the database and pass them to the view.
            var billHistories = _context.BillHistories.Include(b => b.User).ToList();

            _navbarViewModel.UserRole = UsersController.role;
            _navbarViewModel.IsLoggedIn = true;

            // Pass the bill history records to the view.
            ViewBag.BillHistories = billHistories;

            return View(_navbarViewModel);
        }

    }
}
